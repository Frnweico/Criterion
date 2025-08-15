import { useState } from "react";
import classes from "./PropertyPage.module.css";
import mainProperyImg from "../../Assets/Images/xV1.png";
import propertyImg1 from "../../Assets/Images/xV2.png";
import propertyImg2 from "../../Assets/Images/xV3.png";
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';


const PropertyShocwcase = () => {
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

const images =[mainProperyImg, propertyImg1, propertyImg2]

 const [activeImage, setActiveImage] = useState(mainProperyImg);

  return (
    <div className={classes.propertyDetailsWrapper}>
      <div className={classes.propertyDetailsInfo}>
        <h2 className={classes.propertyShowcaseHeaderText}>
          At The Midtown Terraces, <br /> we’ve gone beyond structure. <br /> Our homes
          are:
        </h2>
        <h2 className={classes.propertyHeaderTextMobile}>
          At The Midtown<br />  Terraces, we’ve gone <br />  beyond structure. <br /> Our homes
          are:
        </h2>
        <div className={classes.propertyDetailsLine}>
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
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyShocwcase
