import classes from "./HomeDevelop.module.css";
import homePageDevelop from "../../Assets/Images/homePageDevelop.svg";
import Button from "../../Components/Button/Button";
import { useContext, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { AppContext } from "../../Context/AppContext";
import Image from "../../Components/Image/Image";

const HomeDevelop = () => {
  // Context
  const { scrollToRef } = useContext(AppContext);

  // Effects
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className={classes.container}>
      <p data-aos="fade-up">
        {"Craft your dream space brick by brick".toUpperCase()}
      </p>
      <h3 data-aos="fade-up">
        {"develop a cutting-edge sustainable property".toUpperCase()}
      </h3>
      <Image
        src={homePageDevelop}
        alt="Develop"
        loading="lazy"
        hash="LnI#rzj]IUay~qWBjZofyEofnhoe"
      />

      <Button onClick={scrollToRef}>
        <span>{"GET IN TOUCH"}</span>
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.86307 0.119736L7.58108 1.3906L12.4858 6.11081H0V7.89492H12.4798L7.58108 12.6093L8.86307 13.8803L16 7.00011L8.86307 0.119736Z" />
        </svg>
      </Button>
    </section>
  );
};

export default HomeDevelop;
