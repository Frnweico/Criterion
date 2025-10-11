import classes from "./PropertyPage.module.css";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import type { ReasonsData } from "./property.types";

interface PropertyReasonsProps {
  data: ReasonsData;
}

const PropertyReasons: React.FC<PropertyReasonsProps> = ({ data }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className={classes.propertReasonsWrappper}>
      <div className={classes.propertyReasons}>
        <h2 data-aos="fade-right">
          <span className={classes.propertyReasonsSpan1}>{data.span1}</span>{" "}
          <br />{" "}
          <span className={classes.propertyReasonsSpan2}>{data.span2}</span>{" "}
          <span className={`${data.location.includes("Wuse") ? classes.propertyReasonsSpan3 : ""}`}>{data.location}</span> {""}
          <span className={classes.propertyReasonsSpan4}>{data.place} <span style={{color: "white", fontStyle: "normal"}}>{data.location.includes("Wuse") ? "" : "?"}</span> </span>
        </h2>
        <div className={classes.propertyReasonsWrapper}>
          {data.items.map((item, idx) => (
            <div
              data-aos="fade-up"
              key={idx}
              className={classes.propertyReason}
            >
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyReasons;
