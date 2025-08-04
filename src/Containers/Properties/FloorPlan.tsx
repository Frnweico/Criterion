import { useState } from "react";
import classes from "./PropertyPage.module.css";
import groundFloorImg from "../../Assets/Images/groundFloorImg.jpg";
import firstFloorImg from "../../Assets/Images/firstFloorImg.jpg";
import secondFloorImg from "../../Assets/Images/secondFloorImg.jpg";
import groundFloorSingleImg from "../../Assets/Images/groundFloorSingleImg.jpg";
import firstFloorSingleImg from "../../Assets/Images/firstFloorSingleImg.jpg";
import secondFloorSingleImg from "../../Assets/Images/secondFloorSingleImg.jpg";
import {ArrowBackIos,  ArrowForwardIos} from '@mui/icons-material';

// Component to show room labels
const FloorPlanHeader = ({ title, description }: { title: string; description: string }) => {
  const items = description.split(",").map((item) => item.trim());
  return (
    <div className={classes.floorPlanHeader}>
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
  if (unit === "SINGLE") {
    setSingleFloorIndex((prev) => (direction === "next" ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0)));
  } else {
    setDoubleFloorIndex((prev) => (direction === "next" ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0)));
  }
};

   return (
  <div className={classes.floorPlanWrapper}>
    {floorPlanData.map((unit, index) => {
     const isSingle = unit.unit === "SINGLE";
const currentIndex = isSingle ? singleFloorIndex : doubleFloorIndex;
const floor = unit.floors[currentIndex];

      return (
        <div key={index} className={classes.floorPlan}>
          <h3 className={classes.floorPlanTitle}>
            FLOOR PLAN {unit.unit && <span>({unit.unit} UNIT)</span>}
          </h3>

          <FloorPlanHeader title={floor.title} description={floor.description} />

          <div className={classes.floorPlanImageWithNav}>
            <button
              onClick={() => navigateFloor(unit.unit, "prev")}
  disabled={currentIndex === 0}
  className={classes.arrowButton}
            >
              <ArrowBackIos />
            </button>

            <div className={classes.floorPlanImageWrapper}>
              <img src={floor.img} alt={`${floor.title} for ${unit.unit}`} />
            </div>

            <button
               onClick={() => navigateFloor(unit.unit, "next")}
  disabled={currentIndex === 2}
  className={classes.arrowButton}
            >
              <ArrowForwardIos />
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
};

export default FloorPlan;
