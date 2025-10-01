import Layout from "../../Components/Layout/Layout";
import Transition from "../../Utilities/Transition/Transition";
import HomeContact from "../HomeContact/HomeContact";
import HomeCreate from "../HomeCreate/HomeCreate";
import PropertiesHome from "../HomeCreate/PropertiesHome";
import HomeEnriched from "../HomeEnriched/HomeEnriched";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import HomeHeroSection from "../HomeHeroSection/HomeHeroSection";
import HomeServices from "../HomeServices/HomeServices";
import HomeVideo from "../HomeVideo/HomeVideo";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {
  // Effects
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <HomeHeroSection />
      <HomeFeatures />
      <HomeVideo />
      <HomeFeatures scrollRight />
      <HomeCreate />
      <PropertiesHome />
      <HomeServices />
      <HomeEnriched />
      <HomeContact />
    </Layout>
  );
};

export default Transition(Home);
