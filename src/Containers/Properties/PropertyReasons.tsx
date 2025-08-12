import locationIcon from "../../Assets/Images/Location Icon.svg"
import vipIcon from "../../Assets/Images/Vip Streamline Tabler Line.svg"
import architectureIcon from "../../Assets/Images/Architectural Icon.svg"
import valueIcon from "../../Assets/Images/Diamond Icon.svg"
import investmentIcon from "../../Assets/Images/investment icon.svg"
import customizationIcon from "../../Assets/Images/Cogwheel Settings Account Streamline Atlas Line.svg"
import idealIcon from "../../Assets/Images/ideal icon.svg"
import classes from "./PropertyPage.module.css";
import { useEffect } from "react"
import Aos from 'aos';
import 'aos/dist/aos.css';

const PropertyReasons = () => {
    useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

    const PropertyReasonsData = [
        {
            image: locationIcon,
            title: "Prime Address in Gwarinpa",
            description: "Close to top schools, malls, business districts, and recreational hubs in Abuja"
        },
        {
            image: vipIcon,
            title: "Exclusivity",
            description: "Only 4 units available, guaranteeing privacy and elevated lifestyle standards."
        },
        {
            image: architectureIcon,
            title: "Architectural Distinction",
            description: "Green space-centric living that promotes wellness, beauty, and intimacy with nature."
        },
        {
            image: valueIcon,
            title: "Long-Term Value",
            description: "Custom-built quality ensures low maintenance, high durability, and impressive resale value."
        },
        {
            image: investmentIcon,
            title: "Smart Investment",
            description: "Gwarinpa remains one of Abuja’s fastest-appreciating residential zones."
        },
        {
            image: customizationIcon,
            title: "CUSTOMISATION Opportunity",
            description: "Early buyers can influence interior finishes, fixtures, and layout tweaks."
        },
        {
            image: idealIcon,
            title: "Ideal for Families & Professionals",
            description: "A true sanctuary: generous living spaces, serene outdoor zones, and community comfort."
        }
    ]
  return (
    <div className={classes.propertReasonsWrappper}>
    <div className={classes.propertyReasons}>
      <h2 data-aos="fade-right"><span className={classes.propertyReasonsSpan1}>Why Buy Into</span> <br /> <span className={classes.propertyReasonsSpan2}> The Midtown Terraces,</span> <br /> Gwarinpa, Abuja?</h2>
        <div className={classes.propertyReasonsWrapper}>
            {PropertyReasonsData.map((item, idx) => (
            <div data-aos="fade-up" key={idx} className={classes.propertyReason}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
            </div>
            ))}
    </div>
    </div>
    </div>
  )
}

export default PropertyReasons
