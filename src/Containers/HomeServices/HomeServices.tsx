import classes from "./HomeServices.module.css";
import Button from "../../Components/Button/Button";
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png";
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png";
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png";
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png";

type Service = {
  num: string;
  title: string;
  description: string;
  img: string;
};

const HomeServices = () => {
  const homeServicesData: Service[] = [
    {
      num: "01",
      title: "REAL ESTATE",
      description: "Choose more than a building, choose a home that reflects your personal standard. Live in a space that values distinction, where every detail is held to a high measure. Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
      img: serviceImg1,
    },
    {
      num: "02",
      title: "INVESTMENT",
      description: "Your investments should reflect the same standards you apply to the rest of your life. Choose investment opportunities guided by a principle of value that goes beyond profit; delivering returns that are financially sound, future-proof, and worthy of your portfolio.",
      img: serviceImg2,
    },
    {
      num: "03",
      title: "INFRASTRUCTURE",
      description: "Great living isn't just about where you are. It's about how everything around you supports it. Let every detail work in harmony with the life you lead. Choose infrastructure that quietly shapes environments to elevate everyday living.",
      img: serviceImg3,
    },
    {
      num: "04",
      title: "ADVISORY",
      description: "When your choices carry weight, your counsel should too. Get private, tailored advisory services that help you navigate property, investments, and landmark projects with clarity and confidence. Every recommendation reflects an understanding of your priorities, guided by a measure that doesn't entertain anything but the standard.",
      img: serviceImg4,
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.homeServicesWrapper}>
      
      {/* HEADER: Stays at the top of the container */}
      <div className={classes.servicesFixedHeading}>
        <h2 className={classes.homeServicesHeading}>SERVICES</h2>
      </div>

      <div className={classes.homeServices}>
        {homeServicesData.map((service) => (
          <div key={service.title} className={classes.serviceSection}>
            <div className={classes.serviceContent}>
              
              {/* DESKTOP CONTENT */}
              <div className={classes.homeServicesDetails}>
                <div className={classes.homeServicesLeftSection}>
                  <div className={classes.homeServicesImage}>
                    <img
                      src={service.img}
                      alt={`${service.title} service`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={classes.homeServicesRightSection}>
                  <h2 className={classes.numberHeading}>{service.num}</h2>
                  <h2 className={classes.investmentHeading}>{service.title}</h2>
                  <p>{service.description}</p>
                  <Button type="black" onClick={scrollToContact}>
                    <span>TALK TO US</span>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="#000000">
                      <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* MOBILE CONTENT */}
              <div className={classes.homeServicesDetailsMobile}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>{service.num}</h2>
                <h2 className={classes.investmentHeading}>{service.title}</h2>
                <p>{service.description}</p>
                <Button type="black" onClick={scrollToContact}>
                  <span>TALK TO US</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="#000000">
                    <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                  </svg>
                </Button>
                <div className={classes.homeServicesImage}>
                  <img src={service.img} alt={`${service.title} service`} />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServices;