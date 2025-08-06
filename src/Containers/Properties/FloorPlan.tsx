import { useState, useEffect } from "react";
import classes from "./PropertyPage.module.css";
import groundFloorImg from "../../Assets/Images/groundFloorImg.jpg";
import firstFloorImg from "../../Assets/Images/firstFloorImg.jpg";
import secondFloorImg from "../../Assets/Images/secondFloorImg.jpg";
import groundFloorSingleImg from "../../Assets/Images/groundFloorSingleImg.jpg";
import firstFloorSingleImg from "../../Assets/Images/firstFloorSingleImg.jpg";
import secondFloorSingleImg from "../../Assets/Images/secondFloorSingleImg.jpg";
import leftArrow from "../../Assets/Images/leftArrow.svg";
import rightArrow from "../../Assets/Images/rightArrow.svg";
import Aos from 'aos';
import 'aos/dist/aos.css';

// Component to show room labels
const FloorPlanHeader = ({ title, description }: { title: string; description: string }) => {
  const items = description.split(",").map((item) => item.trim());
  return (
    <div data-aos="fade-up" className={classes.floorPlanHeader}>
      <h2>{title}</h2>
      <div className={classes.floorPlanHeaderItems}>
        {items.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>
    </div>
  );
};

const FloorPlan = () => {
  const [doubleFloorIndex, setDoubleFloorIndex] = useState(0);
const [singleFloorIndex, setSingleFloorIndex] = useState(0);
const [transitioningUnit, setTransitioningUnit] = useState<string | null>(null);

useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

  const floorPlanData = [
    {
      unit: "",
      floors: [
        {
          title: "GROUND FLOOR",
          img: groundFloorImg,
          description: "Lounge, Dining, Laundry, Store",
        },
        {
          title: "FIRST FLOOR",
          img: firstFloorImg,
          description: "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
        {
          title: "SECOND FLOOR",
          img: secondFloorImg,
          description: "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
      ],
    },
    {
      unit: "SINGLE",
      floors: [
        {
          title: "GROUND FLOOR",
          img: groundFloorSingleImg,
          description: "Lounge, Dining, Laundry, Store",
        },
        {
          title: "FIRST FLOOR",
          img: firstFloorSingleImg,
          description: "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
        {
          title: "SECOND FLOOR",
          img: secondFloorSingleImg,
          description: "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
      ],
    },
  ];

 const navigateFloor = (unit: string, direction: "next" | "prev") => {
  setTransitioningUnit(unit);
  setTimeout(() => {
      if (unit === "SINGLE") {
        setSingleFloorIndex((prev) =>
          direction === "next" ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0)
        );
      } else {
        setDoubleFloorIndex((prev) =>
          direction === "next" ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0)
        );
      }
      setTransitioningUnit(null); 
    }, 300); 
};

   return (
    <div className={classes.floorPlanWrapper}>
      {floorPlanData.map((unit, index) => {
        const isSingle = unit.unit === "SINGLE";
        const currentIndex = isSingle ? singleFloorIndex : doubleFloorIndex;
        const floor = unit.floors[currentIndex];
        const isTransitioning = transitioningUnit === unit.unit;

        return (
          <div key={index} className={classes.floorPlan}>
            <h3 className={classes.floorPlanTitle}>
              FLOOR PLAN {unit.unit && <span>({unit.unit} UNIT)</span>}
            </h3>

            <div
              className={`${classes.transitionWrapper} ${
                isTransitioning ? classes.fadeOut : ""
              }`}
            >
              <div data-aos="fade-up" className={classes.floorPlanWithNavigation}>
                {/* Left Arrow */}
                <button
                  onClick={() => navigateFloor(unit.unit, "prev")}
                  disabled={currentIndex === 0}
                  className={classes.arrowButton}
                >
                  <img src={leftArrow} alt="Previous Floor" />
                </button>

                {/* Content Container - Header and Image */}
                <div className={classes.floorPlanContent}>
                  <FloorPlanHeader title={floor.title} description={floor.description} />
                  
                  <div className={classes.floorPlanImageWrapper}>
                    <img src={floor.img} alt={`${floor.title} for ${unit.unit}`} />
                  </div>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => navigateFloor(unit.unit, "next")}
                  disabled={currentIndex === 2}
                  className={classes.arrowButton}
                >
                  <img src={rightArrow} alt="Next Floor" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloorPlan;
