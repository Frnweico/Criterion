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
import Aos from "aos";
import "aos/dist/aos.css";

// Component to show room labels
const FloorPlanHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const items = description.split(",").map((item) => item.trim());
  return (
    <div data-aos="fade-up" className={classes.floorPlanHeader}>
      <h2>{title}</h2>
      <div className={classes.floorPlanHeaderItems}>
        {items.map((item, idx) => (
          <div key={idx}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type LightboxState = {
  open: boolean;
  unitIdx: number; // 0 = double, 1 = single
  idx: number; // slide index
};

const FloorPlan = () => {
  const [doubleFloorIndex, setDoubleFloorIndex] = useState(0);
  const [singleFloorIndex, setSingleFloorIndex] = useState(0);
  const [transitioningUnit, setTransitioningUnit] = useState<string | null>(
    null
  );
  const [swipeDirection, setSwipeDirection] = useState<"next" | "prev" | null>(
    null
  );

  // Lightbox (popup)
  const [lb, setLb] = useState<LightboxState | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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
          description:
            "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
        {
          title: "SECOND FLOOR",
          img: secondFloorImg,
          description:
            "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
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
          description:
            "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
        {
          title: "SECOND FLOOR",
          img: secondFloorSingleImg,
          description:
            "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
        },
      ],
    },
  ];

  const move = (unit: string, dir: "next" | "prev") => {
    const delta = dir === "next" ? 1 : -1;
    if (unit === "SINGLE") {
      setSingleFloorIndex((i) => Math.min(2, Math.max(0, i + delta)));
    } else {
      setDoubleFloorIndex((i) => Math.min(2, Math.max(0, i + delta)));
    }
  };

  const openLb = (unitIdx: number, idx: number) =>
    setLb({ open: true, unitIdx, idx });
  const closeLb = () => setLb(null);

  const lbNext = () =>
    setLb((s) =>
      !s
        ? s
        : {
            ...s,
            idx: Math.min(
              floorPlanData[s.unitIdx].floors.length - 1,
              s.idx + 1
            ),
          }
    );
  const lbPrev = () =>
    setLb((s) => (!s ? s : { ...s, idx: Math.max(0, s.idx - 1) }));

  const onLbTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.changedTouches[0].clientX);
  const onLbTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const THRESH = 40;
    if (dx > THRESH) lbPrev();
    if (dx < -THRESH) lbNext();
    setTouchStartX(null);
  };

  return (
    <div className={classes.floorPlanWrapper}>
      {floorPlanData.map((unit, unitIdx) => {
        const isSingle = unit.unit === "SINGLE";
        const currentIndex = isSingle ? singleFloorIndex : doubleFloorIndex;
        const len = unit.floors.length;

        return (
          <div key={unitIdx} className={classes.floorPlan}>
            <h3 className={classes.floorPlanTitle}>
              FLOOR PLAN {unit.unit && <span>({unit.unit} UNIT)</span>}
            </h3>

            <div className={classes.transitionWrapper}>
              <div className={classes.floorPlanWithNavigation}>
                {/* Left Arrow */}
                <button
                  onClick={() => move(unit.unit, "prev")}
                  disabled={currentIndex === 0}
                  className={classes.arrowButton}
                >
                  <img src={leftArrow} alt="Previous Floor" />
                </button>

                {/* Content Container - Header and Image */}
                <div className={classes.floorPlanContent}>
                  <div className={classes.floorPlanHeaderRow}>
                    <button
                      onClick={() => move(unit.unit, "prev")}
                      disabled={currentIndex === 0}
                      className={`${classes.overlayArrow} ${classes.overlayArrowLeft}`}
                      aria-label="Previous (mobile)"
                    >
                      <img src={leftArrow} alt="" />
                    </button>
                    <FloorPlanHeader
                      title={unit.floors[currentIndex].title}
                      description={unit.floors[currentIndex].description}
                    />
                    <button
                      onClick={() => move(unit.unit, "next")}
                      disabled={currentIndex === len - 1}
                      className={`${classes.overlayArrow} ${classes.overlayArrowRight}`}
                      aria-label="Next (mobile)"
                    >
                      <img src={rightArrow} alt="" />
                    </button>
                  </div>

                  {/* carousel */}
                  <div className={classes.carouselViewport}>
                    <div
                      className={classes.carouselTrack}
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {unit.floors.map((floor, idx) => (
                        <div className={classes.carouselSlide} key={idx}>
                          <div
                            className={classes.floorPlanImageWrapper}
                            role="button"
                            onClick={() => openLb(unitIdx, idx)}
                            aria-label="Open large view"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                openLb(unitIdx, idx);
                              }
                            }}
                          >
                            <img
                              src={floor.img}
                              alt={`${floor.title} for ${
                                unit.unit || "DOUBLE"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => move(unit.unit, "next")}
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
