import { lazy, Suspense, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import MountLoader from "./Components/MountLoader/MountLoader";
import WhatsAppWidget from "./WhatsappWidget";
import { AppContext } from "./Context/AppContext";

const Home = lazy(() => import("./Containers/Home/Home"));
const About = lazy(() => import("./Containers/About/About"));
const Careers = lazy(() => import("./Containers/Careers/Careers"));
const PropertyPage = lazy(() => import("./Containers/Properties/PropertyPage"));

function App() {
  const location = useLocation();

  const { loading } = useContext(AppContext);

  if (loading) return <MountLoader />;

  return (
    <>
    <AnimatePresence mode="wait">
      <Suspense fallback={<div style={{ background: '#191919', minHeight: '100vh' }} />}>
      <Routes location={location} key={location.pathname}>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about-us" />
          <Route element={<Careers />} path="/careers" />
          <Route path="/properties/:propertyId" element={<PropertyPage />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
    <WhatsAppWidget 
        phoneNumber="+2348058573915"
        message="Hello! I'm interested in learning more about Criterion Homes properties."
      />
    </>
  );
}

export default App;
