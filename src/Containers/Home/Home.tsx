import Layout from "../../Components/Layout/Layout";
import Transition from "../../Utilities/Transition/Transition";
import HomeContact from "../HomeContact/HomeContact";
import HomeCreate from "../HomeCreate/HomeCreate";
import MidtownTerrace from "../HomeCreate/MidtownTerrace";
import HomeDevelop from "../HomeDevelop/HomeDevelop";
import HomeEmbedding from "../HomeEmbedding/HomeEmbedding";
import HomeEnriched from "../HomeEnriched/HomeEnriched";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import HomeHeroSection from "../HomeHeroSection/HomeHeroSection";
import HomeServices from "../HomeServices/HomeServices";
import HomeSignUp from "../HomeSignUp/HomeSignUp";
import HomeTranscending from "../HomeTranscending/HomeTranscending";
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
      <MidtownTerrace />
      <HomeServices />
      <HomeEnriched />
      <HomeContact />
      {/* <HomeEmbedding /> */}
      {/* <HomeTranscending /> */}
      {/* <HomeDevelop /> */}
      {/* <HomeSignUp /> */}
    </Layout>
  );
};

export default Transition(Home);
