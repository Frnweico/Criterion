import classes from "./PropertyPage.module.css";
import line from "../../Assets/Images/Line 8.svg";
import Button from "../../Components/Button/Button";
import { WhatsApp } from "@mui/icons-material";
import phone from "../../Assets/Images/Phone Call Streamline Feather1.svg";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import type { PricingData } from "./property.types";

interface PropertyPricingProps {
  data: PricingData;
  contact?: { phone: string; whatsapp: string };
}

const PropertyPricing: React.FC<PropertyPricingProps> = ({ data, contact }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div data-aos="fade-up" className={classes.propertyPricing}>
        <h2>Pricing & Payment Plan</h2>
        <div className={classes.propertyPricingContent}>
          <img src={line} alt="a line" />
          <div className={classes.propertyTableWrapper}>
            <table className={classes.pricingTable}>
              <thead>
                <tr>
                  <th>MILESTONE</th>
                  <th>PAYMENT</th>
                  <th>TIMELINE</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {row.milestone.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </td>
                    <td>{row.payment}</td>
                    <td>{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={classes.staticRow}>
              {data.staticRows.map((row, index) => (
                <div key={index}>
                  <p>{row.label}</p>
                  <p className={classes.staticRowText}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.propertyPricingContact}>
        <div className={classes.propertyPricingContactText}>
          <h3>
            CRITERION <br /> HOMES' CONTACT
          </h3>
          <div>
            {" "}
            <WhatsApp style={{ fontSize: "16px" }} />{" "}
            <img src={phone} alt="phone icon" />
            <span>{contact?.phone}</span>
          </div>
        </div>
        <a
          href={contact?.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button type="enriched">
            {" "}
            <span>TALK TO US</span>
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
            </svg>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PropertyPricing;
