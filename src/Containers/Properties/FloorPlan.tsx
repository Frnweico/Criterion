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
  onPrev,
  onNext,
  currentIndex,
  maxIndex,
}: {
  title: string;
  description: string;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  maxIndex: number;
}) => {
  const items = description.split(",").map((item) => item.trim());
  return (
    <div data-aos="fade-up" className={classes.floorPlanHeader}>
      <div className={classes.floorPlanTitleRow}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`${classes.overlayArrow} ${classes.overlayArrowLeft}`}
          aria-label="Previous (mobile)"
        >
          <img src={leftArrow} alt="" />
        </button>
        <h2>{title}</h2>
        <button
          onClick={onNext}
          disabled={currentIndex === maxIndex}
          className={`${classes.overlayArrow} ${classes.overlayArrowRight}`}
          aria-label="Next (mobile)"
        >
          <img src={rightArrow} alt="" />
        </button>
      </div>
      <div className={classes.floorPlanHeaderItems}>
        {items.map((item, idx) => (
          <div key={idx}>
            <p className={idx === items.length - 1 ? classes.lastItem : ''}>{item}</p>
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

  // Handle touch events for mobile swipe
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
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
      <div className={classes.lightboxInner} onClick={(e) => e.stopPropagation()}>
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

const FloorPlan = () => {
  // Each unit has its own independent floor index
  const [floorIndices, setFloorIndices] = useState([0, 0]); // [doubleUnit, singleUnit]
  const [lightbox, setLightbox] = useState({ isOpen: false, unitIdx: 0, currentIndex: 0 });
   const [isTransitioning, setIsTransitioning] = useState(false);


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

  const move = (unitIdx: number, dir: "next" | "prev") => {
    if (isTransitioning) return; 

    const delta = dir === "next" ? 1 : -1;
    setFloorIndices(prev => {
      const newIndices = [...prev];
      const newIndex = prev[unitIdx] + delta;

       // Boundary check
      if (newIndex >= 0 && newIndex < floorPlanData[unitIdx].floors.length) {
        setIsTransitioning(true);
        newIndices[unitIdx] = newIndex;
        
        // Reset transition flag after animation completes
        setTimeout(() => setIsTransitioning(false), 600); // Match CSS transition duration
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
      currentIndex: imageIdx
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      unitIdx: 0,
      currentIndex: 0
    });
  };

  const lightboxNext = () => {
    const maxIndex = floorPlanData[lightbox.unitIdx].floors.length - 1;
    if (lightbox.currentIndex < maxIndex) {
      setLightbox(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    }
  };

  const lightboxPrev = () => {
    if (lightbox.currentIndex > 0) {
      setLightbox(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
    }
  };

  // Get current lightbox images and titles
  const currentLightboxImages = lightbox.isOpen 
    ? floorPlanData[lightbox.unitIdx].floors.map(floor => floor.img)
    : [];
  
  const currentLightboxTitles = lightbox.isOpen 
    ? floorPlanData[lightbox.unitIdx].floors.map(floor => 
        `${floor.title} for ${floorPlanData[lightbox.unitIdx].unit || "DOUBLE"} UNIT`
      )
    : [];

  return (
    <div className={classes.floorPlanWrapper}>
      {floorPlanData.map((unit, unitIdx) => {
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
                <div className={classes.floorPlanContent}>
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