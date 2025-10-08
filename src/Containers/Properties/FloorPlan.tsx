import { useState, useEffect } from "react";
import classes from "./PropertyPage.module.css";
import leftArrow from "../../Assets/Images/leftArrow.svg";
import rightArrow from "../../Assets/Images/rightArrow.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import type { FloorPlanUnit } from "./property.types";

interface FloorPlanProps {
  data: FloorPlanUnit[];
}

// Component to show room labels
const FloorPlanHeader = ({
  title,
  description,
  onPrev,
  onNext,
  currentIndex,
  maxIndex,
  isUrbanNestUnit
}: {
  title: string;
  description: string;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  maxIndex: number;
   isUrbanNestUnit?: boolean;
}) => {
  const items = description.split(",").map((item) => item.trim());
  const isUrbanNest = description.includes("Family Lounge");
  const urbanNest = description.includes("Family Lounge") || description.includes("Kitchen") || description.includes("Private Balcony");

   return (
    <div data-aos="fade-up" className={`${classes.floorPlanHeader} ${urbanNest ? classes.urbanNestTitleRow : ""}`}>
      <div className={`${classes.floorPlanTitleRow}`}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`${classes.overlayArrow} ${classes.overlayArrowLeft}`}
          aria-label="Previous (mobile)"
        >
          <img src={leftArrow} alt="" />
        </button>
        <h2
          className={`${
            title === "FIRST FLOOR"
              ? `${classes.floorPlanTitleFirstFloor}`
              : title === "GROUND FLOOR"
              ? `${classes.floorPlanTitleGroundFloor}`
              : title === "SECOND FLOOR"
              ? `${classes.floorPlanTitleSecondFloor}`
              : ""
          }`}
        >
          {title}
        </h2>
        <button
          onClick={onNext}
          disabled={currentIndex === maxIndex}
          className={`${classes.overlayArrow} ${classes.overlayArrowRight}`}
          aria-label="Next (mobile)"
        >
          <img src={rightArrow} alt="" />
        </button>
      </div>
      <div className={`${classes.floorPlanHeaderItems}  ${urbanNest ? classes.urbanNestP : ""} ${isUrbanNest ? classes.urbanNestItems : ""}`}>
        {items.map((item, idx) => (
          <div key={idx}>
            <p className={`${isUrbanNest && idx === 0 ? classes.centered : ""} ${
                idx === items.length - 1 ? classes.lastItem : ""
              }`}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lightbox Component
interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  titles: string[];
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  titles,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < images.length - 1) {
        onNext();
      } else if (diff < 0 && currentIndex > 0) {
        onPrev();
      }
    }
    setTouchStartX(null);
  };

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={classes.lightboxBackdrop}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={classes.lightboxInner}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.lightboxClose} onClick={onClose}>
          ×
        </button>

        <button
          className={`${classes.lightboxArrow} ${classes.lightboxArrowLeft}`}
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <img src={leftArrow} alt="Previous" />
        </button>

        <img
          src={images[currentIndex]}
          alt={titles[currentIndex]}
          className={classes.lightboxImage}
        />

        <button
          className={`${classes.lightboxArrow} ${classes.lightboxArrowRight}`}
          onClick={onNext}
          disabled={currentIndex === images.length - 1}
        >
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
    </div>
  );
};

const FloorPlan: React.FC<FloorPlanProps> = ({ data }) => {
  const [floorIndices, setFloorIndices] = useState(data.map(() => 0));
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    unitIdx: 0,
    currentIndex: 0,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);


const isUrbanNest = (unitIdx: number) => {
    const floors = data[unitIdx]?.floors;
    return floors.some(floor => 
      floor.description.includes("Family Lounge") ||
      floor.description.includes("Urban Nest")
    );
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const move = (unitIdx: number, dir: "next" | "prev") => {
    if (isTransitioning) return;

    const delta = dir === "next" ? 1 : -1;
    setFloorIndices((prev) => {
      const newIndices = [...prev];
      const newIndex = prev[unitIdx] + delta;

      // Boundary check
      if (newIndex >= 0 && newIndex < data[unitIdx].floors.length) {
        setIsTransitioning(true);
        newIndices[unitIdx] = newIndex;

        // Reset transition flag after animation completes
        setTimeout(() => setIsTransitioning(false), 600);
      }

      return newIndices;
    });
  };

  // Lightbox functions
  const openLightbox = (unitIdx: number, imageIdx: number) => {
    if (isTransitioning) return;

    setLightbox({
      isOpen: true,
      unitIdx,
      currentIndex: imageIdx,
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      unitIdx: 0,
      currentIndex: 0,
    });
  };

  const lightboxNext = () => {
    const maxIndex = data[lightbox.unitIdx].floors.length - 1;
    if (lightbox.currentIndex < maxIndex) {
      setLightbox((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  };

  const lightboxPrev = () => {
    if (lightbox.currentIndex > 0) {
      setLightbox((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  };

  // Get current lightbox images and titles
  const currentLightboxImages = lightbox.isOpen
    ? data[lightbox.unitIdx].floors.map((floor) => floor.img)
    : [];

  const currentLightboxTitles = lightbox.isOpen
    ? data[lightbox.unitIdx].floors.map(
        (floor) =>
          `${floor.title} for ${data[lightbox.unitIdx].unit || "DOUBLE"} UNIT`
      )
    : [];

  return (
    <div className={classes.floorPlanWrapper}>
      {data.map((unit, unitIdx) => {
        const currentIndex = floorIndices[unitIdx];
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
                  onClick={() => move(unitIdx, "prev")}
                  disabled={currentIndex === 0 || isTransitioning}
                  className={classes.arrowButton}
                >
                  <img src={leftArrow} alt="Previous Floor" />
                </button>

                {/* Content Container - Header and Image */}
                <div className={`${classes.floorPlanContent} ${isUrbanNest(unitIdx) ? classes.urbanNestContent : ""}`}>
                  <div className={classes.floorPlanHeaderRow}>
                    <FloorPlanHeader
                      title={unit.floors[currentIndex].title}
                      description={unit.floors[currentIndex].description}
                      onPrev={() => move(unitIdx, "prev")}
                      onNext={() => move(unitIdx, "next")}
                      currentIndex={currentIndex}
                      maxIndex={len - 1}
                    />
                  </div>

                  {/* Carousel with smoother sliding animation */}
                  <div className={classes.carouselViewport}>
                    <div
                      className={classes.carouselTrack}
                      style={{
                        transform: `translateX(-${currentIndex * 33.333}%)`,
                      }}
                    >
                      {unit.floors.map((floor, idx) => (
                        <div className={classes.carouselSlide} key={idx}>
                          <div
                            className={classes.floorPlanImageWrapper}
                            role="button"
                            onClick={() => openLightbox(unitIdx, idx)}
                            aria-label="Open large view"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                openLightbox(unitIdx, idx);
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
                  onClick={() => move(unitIdx, "next")}
                  disabled={currentIndex === len - 1 || isTransitioning}
                  className={classes.arrowButton}
                >
                  <img src={rightArrow} alt="Next Floor" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={currentLightboxImages}
        currentIndex={lightbox.currentIndex}
        onClose={closeLightbox}
        onNext={lightboxNext}
        onPrev={lightboxPrev}
        titles={currentLightboxTitles}
      />
    </div>
  );
};

export default FloorPlan;
