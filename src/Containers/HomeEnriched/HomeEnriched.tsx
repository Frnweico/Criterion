import classes from "./HomeEnriched.module.css";
import enrichedImg from "../../Assets/Images/homeEnrichedImg.png";

const HomeEnriched = () => {
  return (
    <div className={classes.homeEnriched}>
      <h2 data-aos = "fade-up">EVERYDAY LIVING, <br /> ENRICHED BY <span>NATURE</span></h2>
      <img src={enrichedImg} alt="a street" />
      {/* <Button data-aos= "fade-up"
          type="enriched"
          onClick={() => {
          }}
        >
          <span>{"Build with us".toUpperCase()}</span>
          <svg
            width="17"
            height="14"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.36307 0.119751L8.08108 1.39062L12.9858 6.11082H0.5V7.89493H12.9798L8.08108 12.6094L9.36307 13.8803L16.5 7.00012L9.36307 0.119751Z" />
          </svg>
        </Button> */}
    </div>
  )
}

export default HomeEnriched
