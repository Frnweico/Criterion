import { useState, useEffect } from "react";
import classes from "./PropertyPage.module.css";
import mainProperyImg from "../../Assets/Images/xV1.png";
import propertyImg1 from "../../Assets/Images/xV2.png";
import propertyImg2 from "../../Assets/Images/xV3.png";
import line from "../../Assets/Images/Line 6.svg";
import Aos from 'aos';
import 'aos/dist/aos.css';
import horizontalLine from "../../Assets/Images/Frame 417.svg";
import leftArrow from "../../Assets/Images/leftArrow.svg";
import rightArrow from "../../Assets/Images/rightArrow.svg";

// Property Lightbox Component - Now using unified classes
interface PropertyLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const PropertyLightbox: React.FC<PropertyLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
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
      if (diff > 0) {
        onNext();
      } else {
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
          alt={`Property view ${currentIndex + 1}`}
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

const PropertyShowcase = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const features = [
    {
      title: "MODERN",
      description:
        "Clean lines, minimalist facades, large glass openings, and a balanced palette that blends beautifully with the surrounding nature.",
    },
    {
      title: "WELL BUILT",
      description:
        "Constructed with premium materials and supervised by seasoned engineers and project managers.",
    },
    {
      title: "FUNCTIONAL",
      description:
        "Open-plan layouts, en-suite bedrooms, ample storage, intuitive kitchen and utility spaces, and integrated home automation options.",
    },
    {
      title: "NATURALLY ILLUMINATED",
      description:
        "Maximized natural light through skylights, large windows, and atriums.",
    },
    {
      title: "GREEN INSPIRED",
      description:
        "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
    },
  ];

  const images = [mainProperyImg, propertyImg1, propertyImg2];
  const [activeImage, setActiveImage] = useState(mainProperyImg);
  const [propertyLightbox, setPropertyLightbox] = useState({
    isOpen: false,
    currentIndex: 0
  });

  // Property lightbox functions
  const openPropertyLightbox = (imageIndex: number) => {
    setPropertyLightbox({
      isOpen: true,
      currentIndex: imageIndex
    });
  };

  const closePropertyLightbox = () => {
    setPropertyLightbox({
      isOpen: false,
      currentIndex: 0
    });
  };

  const propertyLightboxNext = () => {
    if (propertyLightbox.currentIndex < images.length - 1) {
      setPropertyLightbox(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    }
  };

  const propertyLightboxPrev = () => {
    if (propertyLightbox.currentIndex > 0) {
      setPropertyLightbox(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
    }
  };

  // Find current active image index
  const activeImageIndex = images.findIndex(img => img === activeImage);

  return (
    <div className={classes.propertyDetailsWrapper}>
      <div className={classes.propertyDetailsInfo}>
        <h2 className={classes.propertyShowcaseHeaderText}>
          At The Midtown Terraces, <br /> we've gone beyond structure. <br /> Our homes
          are:
        </h2>
        <div className={classes.propertyDetailsLinee}>
          <img src={line} alt="line" />
        </div>
        <h2 className={classes.propertyHeaderTextMobile}>
          At The Midtown<br /> Terraces, we've gone <br /> beyond structure. <br /> Our homes
          are:
        </h2>
      </div>

      <div className={classes.propertyShowcaseContent}>
        <div className={classes.propertyDetailsImages}>
          <div 
            className={classes.propertyDetailsMainImage}
            onClick={() => openPropertyLightbox(activeImageIndex)}
            style={{ cursor: 'pointer' }}
          >
            <img src={activeImage} alt="Property" />
          </div>
          <div className={classes.propertyDetailsThumbnails}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                alt={`Thumbnail ${idx + 1}`}
                className={
                  img === activeImage
                    ? classes.propertyDetailsThumbnailActive
                    : classes.propertyDetailsThumbnail
                }
              />
            ))}
          </div>
        </div>
        <div className={classes.propertyDetailsFeatures}>
          {features.map((item, index) => (
            <div
              key={index}
              className={`${classes.propertyDetailsFeatureItem} ${classes.propertyDetailsFeatureVisible}`}
            >
              <h4>{item.title}</h4>
              <img src={horizontalLine} alt="horizontal line" />
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Property Lightbox - Now using unified classes */}
      <PropertyLightbox
        isOpen={propertyLightbox.isOpen}
        images={images}
        currentIndex={propertyLightbox.currentIndex}
        onClose={closePropertyLightbox}
        onNext={propertyLightboxNext}
        onPrev={propertyLightboxPrev}
      />
    </div>
  );
};

export default PropertyShowcase;