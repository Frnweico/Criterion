import { useEffect } from "react";
import line5 from "../../Assets/Images/Line 5.svg";
import Layout from "../../Components/Layout/Layout";
import classes from "./PropertyPage.module.css";
import Button from "../../Components/Button/Button";
import { WhatsApp } from "@mui/icons-material";
import phone from "../../Assets/Images/Phone Call Streamline Feather.svg";
import FloorPlan from "./FloorPlan";
import PropertyReasons from "./PropertyReasons";
import PropertyPricing from "./PropertyPricing";
import PropertyLocation from "./PropertyLocation";
import Aos from "aos";
import "aos/dist/aos.css";
import { Navigate, useParams } from "react-router-dom";
import { getProperty } from "./property.types";
import PropertyShowcase from "./PropertyShowcase";
import HeadManager from "../../Components/HeadManager";

const PropertyPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Get property data
  const propertyData = getProperty(propertyId || "");
  console.log(propertyId);

  // If property doesn't exist, redirect to 404 or home
  if (!propertyData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Layout isDark>
      <HeadManager
        title={`${propertyData.name} — ${propertyData.location} | Criterion Homes Limited`}
        description={propertyData.description?.subtitle || "Explore this property by Criterion Homes."}
        canonical={`https://www.criterionhomesltd.com/properties/${propertyId}`}
      />

      <div className={classes.propertyPageContainer}>
        <div className={classes.propertyImageContainer}>
          <img
            data-aos="fade-up"
            src={propertyData.heroImage}
            alt={`${propertyData.name} img`}
          />
        </div>
        <header>
          <div className={classes.propertyHeaderText}>
            <h2 data-aos="fade-up">{propertyData.name}</h2>
            <img src={line5} alt="line" />
            <p data-aos="fade-up">{propertyData.location}</p>
          </div>
          <div data-aos="fade-up" className={`${classes.propertyHeaderDetails} ${propertyData.name === "THE URBAN NEST" ? classes.centerLastDetail : ""}`}>
            {Array.from(
              { length: Math.ceil(propertyData.headerDetails.length / 2) },
              (_, groupIndex) => (
                <div key={groupIndex} className={classes.propertyGroup}>
                  {propertyData.headerDetails
                    .slice(groupIndex * 2, groupIndex * 2 + 2)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={classes.propertyHeaderDetail}
                      >
                        <img src={item.icon} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    ))}
                </div>
              )
            )}
          </div>
        </header>
        <div className={classes.propertyPageContact}>
          <div className={classes.propertyPageContactText}>
            <p className={classes.propertyPageContactText1} data-aos="fade-up">
              {propertyData.description.subtitle}
            </p>
            <h4 data-aos="fade-up">{propertyData.description.title}</h4>
            <div
              data-aos="fade-up"
              className={classes.propertyPageContactTextInfo}
            >
              {propertyData.description.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div
            data-aos="fade-up"
            className={classes.propertyPageContactDetails}
          >
            <h3>CRITERION HOMES' CONTACT</h3>
            <div>
              {" "}
              <WhatsApp style={{ fontSize: "16px" }} />{" "}
              <img src={phone} alt="phone icon" />
              <span>{propertyData.contact.phone}</span>
            </div>
            <a
              href={propertyData.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button type="gray">
                {" "}
                <span>TALK TO US</span>
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                </svg>
              </Button>
            </a>
          </div>
        </div>
        <div className={classes.projectDetails}>
          <h3>PROJECT DETAILS</h3>
          <div className={classes.midtownDetailsWrapper}>
            {propertyData.projectDetails.map((item) => (
              <div
                data-aos="fade-up"
                key={item.id}
                className={classes.midtownDetails}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <PropertyShowcase data={propertyData.showcase} />
        </div>
        <PropertyLocation data={propertyData.locationData} />
        <FloorPlan data={propertyData.floorPlans} />
        <PropertyReasons data={propertyData.reasons} />
        <PropertyPricing
          data={propertyData.pricing}
          contact={propertyData.contact}
        />
      </div>
    </Layout>
  );
};

export default PropertyPage;
