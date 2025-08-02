import Button from "../../Components/Button/Button";
import classes from "./HomeEmbedding.module.css";
import embedding from "../../Assets/Images/embedding.jpg";
import { useNavigate } from "react-router-dom";
import { scrollToTheTop } from "../../HelperFunctions/scrollToTop";
import Image from "../../Components/Image/Image";

const HomeEmbedding = () => {
  // Router
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <div className={classes.textSection}>
        <h4 data-aos="fade-up">
          EVERYDAY LIVING, <br /> ENRICHED BY <span>NATURE</span>
        </h4>

      </div>

      <Image
        src={embedding}
        alt="Embedding"
        loading="lazy"
        data-aos="fade-up"
        hash="L3ECqFpJ00H=^+xVEMI.Di-;VsM|"
        height={300}
        adaptToParentDimensions
      />

      <Button
          type="secondary"
          onClick={() => {
            navigate("/about-us");
            scrollToTheTop();
          }}
        >
          <span>{"Read more about us".toUpperCase()}</span>
          <svg
            width="17"
            height="14"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.36307 0.119751L8.08108 1.39062L12.9858 6.11082H0.5V7.89493H12.9798L8.08108 12.6094L9.36307 13.8803L16.5 7.00012L9.36307 0.119751Z" />
          </svg>
        </Button>
    </section>
  );
};

export default HomeEmbedding;
