import property1 from "../../Assets/Images/property1.jpg"
import terraceIcon from "../../Assets/Images/terrace icon.svg"
import bedIcon from "../../Assets/Images/bed icon.svg"
import floorsIcon from "../../Assets/Images/floors icon.svg"
import approxIcon from "../../Assets/Images/approx icon.svg"
import line5 from "../../Assets/Images/Line 5.svg"
import Layout from "../../Components/Layout/Layout";
import classes from "./PropertyPage.module.css";
import Button from "../../Components/Button/Button";
import { WhatsApp} from '@mui/icons-material';
import phone from "../../Assets/Images/Phone Call Streamline Feather.svg"
import PropertyShocwcase from "./PropertyShocwcase";
import FloorPlan from "./FloorPlan";
import PropertyReasons from "./PropertyReasons";
import PropertyPricing from "./PropertyPricing";
import PropertyLocation from "./PropertyLocation";

const PropertyPage = () => {
    const propertyData = [
        {id:1, 
        icon: terraceIcon,
        name: "Terrace Duplexes"
        },
        {
            id: 2,
            icon: bedIcon,
            name: "4 Bedroom",
        },
        {
            id: 3,
            icon: floorsIcon,
            name: "3 Floors",
        },
        {
            id: 4,
            icon: approxIcon,
            name: "Approx. 1014 m²",
        }
    ]

     const midtownData = [
        {
            id: 1,
            title: "LOCATION",
            description: "Plot 237, along 69 21A road Gwarimpa II Estate. Abuja"
        },
        {
            id: 2,
            title: "UNITS",
            description: "4 exclusively built 4-bedroom terrace duplexes \+ atrium for light and ventilation.",
        },
        {
            id: 3,
            title: "EXTRA FEATURE",
            description: "All units' bedrooms come with spacious balconies.",
        },
        {
            id: 4,
            title: "#250,000,000",
            description: "Installment Plan - 20% initial deposit (₦55M), flexible balance within 10 months."
        },
    ]

  return (
    <Layout isDark>
    <div className={classes.propertyPageContainer}>
      <div className={classes.propertyImageContainer}>
        <img src={property1} alt="midtown terrace image" />
      </div>
        <header>
            <div className={classes.propertyHeaderText}>
            <h2>THE MIDTOWN TERRACES</h2>
            <img src={line5} alt="line" />
            <p>Gwarinpa, Abuja,</p>
            </div>
            <div className={classes.propertyHeaderDetails}>
            {propertyData.map((item) => (
                <div key={item.id} className={classes.propertyHeaderDetail}>
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                </div> ))}</div>
        </header>
        <div className={classes.propertyPageContact}>
            <div className={classes.propertyPageContactText}>
                <p>DESCRIPTION</p>
                <h4>Welcome to The Midtown Terraces</h4>
                <div className={classes.propertyPageContactTextInfo}>
                <p>An exclusive collection of just 4 custom-built, 4-bedroom terrace duplexes with maid’s quarters, nestled in the heart of Gwarinpa, Abuja. This premium development is a celebration of modern architecture fused with nature—crafted for discerning families who crave serenity, function, and timeless elegance in one space.
</p>
<p>Each home is designed with purposeful flow, generous natural lighting, and a signature private patch adorned with lush greenery, transforming daily living into an experience of peace, wellness, and connection.</p>
</div>
            </div>
            <div className={classes.propertyPageContactDetails}>
                <h3>CRITERION <br/> HOMES' CONTACT</h3>
                <div> <WhatsApp style={{fontSize: '16px'}} /> <img src={phone} alt="phone icon" /><span>+234 805 857 3915</span></div>
                <a href="https://wa.me/2348058573915" target='_blank' rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button type="white"> <span>TALK TO US</span>
                <svg
            width='16'
            height='14'
            viewBox='0 0 16 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
          </svg></Button></a>
            </div>
        </div>
        <div className={classes.projectDetails}>
            <h3>PROJECT DETAILS</h3>
             <div className={classes.midtownDetailsWrapper}>
                {midtownData.map((item) => (
                    <div key={item.id} className={classes.midtownDetails}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
           <PropertyShocwcase />
        </div>
        <PropertyLocation />
        <FloorPlan />
        <PropertyReasons />
        <PropertyPricing />
      </div>
    </Layout>
  )
}

export default PropertyPage
