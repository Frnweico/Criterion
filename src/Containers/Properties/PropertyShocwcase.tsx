import { useState } from "react";
import classes from "./PropertyPage.module.css";
import mainProperyImg from "../../Assets/Images/mainPropertyImg.svg";
import propertyImg1 from "../../Assets/Images/propertyImg1.svg";
import propertyImg2 from "../../Assets/Images/propertyImg2.svg";
import horizontalLine from "../../Assets/Images/Line 10.svg";

const PropertyShocwcase = () => {
    const features = [
      {
        title: "MODERN",
        description:
          "Clean lines, minimalist facades, large glass openings, and a balanced palette that blends beautifully.",
      },
  {
    title: "WELL BUILT",
    description:
      "Constructed with premium materials and supervised by seasoned engineers and project managers.",
  },
  {
    title: "FUNCTIONAL",
    description:
      "Open-plan layouts, intuitive kitchen/utility spaces, and integrated home automation.",
  },
  {
    title: "NATURALLY ILLUMINATED",
    description:
      "Maximized natural light through skylights, large windows, and atriums.",
  },
  {
    title: "GREEN INSPIRED",
    description:
      "Each home is built around lushly landscaped compound spaces for mental well-being and air quality.",
  },
];

const images =[mainProperyImg, propertyImg1, propertyImg2]

 const [activeImage, setActiveImage] = useState(mainProperyImg);

  return (
    <div className={classes.propertyDetailsWrapper}>
      <div className={classes.propertyDetailsInfo}>
        <h2>
          At The Midtown Terraces, <br /> we’ve gone beyond structure. <br /> Our homes
          are:
        </h2>
        <div className={classes.propertyDetailsLine}>
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, explicabo ad! Nisi, dolorem reiciendis architecto quidem fuga praesentium, eius, beatae quisquam expedita doloremque officia officiis neque dolores illo ipsa consectetur. */}
        </div>
        
      </div>

      <div className={classes.propertyShowcaseContent}>
        <div className={classes.propertyDetailsImages}>
          <div className={classes.propertyDetailsMainImage}>
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
              {/* <img src={horizontalLine} alt="horizontal line" /> */}
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyShocwcase
