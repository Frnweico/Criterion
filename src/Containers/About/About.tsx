import Layout from "../../Components/Layout/Layout";
import Transition from "../../Utilities/Transition/Transition";
import AboutCoreValues from "../AboutCoreValues/AboutCoreValues";
import AboutTheTeam from "../AboutTheTeam/AboutTheTeam";
import AboutVision from "../AboutVision/AboutVision";
import AboutWhoWeAre from "../AboutWhoWeAre/AboutWhoWeAre";
import HeadManager from "../../Components/HeadManager";

const About = () => {
  return (
    <Layout isDark>
       <HeadManager
        title="About Criterion Homes | Building Modern Sustainable Homes in Nigeria"
        description="Learn more about Criterion Homes — a real estate company in Nigeria creating modern, sustainable homes designed for today's living."
        canonical="https://www.criterionhomesltd.com/about-us"
      />
      <AboutWhoWeAre />
      <AboutVision />
      <AboutCoreValues />
      <AboutTheTeam />
    </Layout>
  );
};

export default Transition(About);
