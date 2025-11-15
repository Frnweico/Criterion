import { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { AppContext } from "../../Context/AppContext";
import Transition from "../../Utilities/Transition/Transition";
import AboutTheTeam from "../AboutTheTeam/AboutTheTeam";
import CareerAboutCriterion from "../CareerAboutCriterion/CareerAboutCriterion";
import CareerHero from "../CareerHero/CareerHero";
import CareerOpenings from "../CareerOpenings/CareerOpenings";
import HeadManager from "../../Components/HeadManager";

const Careers = () => {
  // COntext
  const { openingsRef } = useContext(AppContext);
  return (
    <Layout>
      <HeadManager
  title="Careers at Criterion Homes Limited"
  description="Explore career opportunities at Criterion Homes. Join a team committed to excellence, innovation, and delivering top-quality housing solutions across Nigeria."
  canonical="https://www.criterionhomesltd.com/careers"
/>
      <CareerHero />
      <CareerAboutCriterion />
      <AboutTheTeam />
      <div ref={openingsRef}>
        <CareerOpenings />
      </div>
    </Layout>
  );
};

export default Transition(Careers);
