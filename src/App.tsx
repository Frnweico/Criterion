import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import MountLoader from "./Components/MountLoader/MountLoader";
import About from "./Containers/About/About";
import Careers from "./Containers/Careers/Careers";
import Home from "./Containers/Home/Home";
import PropertyPage from "./Containers/Properties/PropertyPage";
import WhatsAppWidget from "./WhatsappWidget";

function App() {
  // Router
  const location = useLocation();
  return (
    <>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MountLoader />}>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about-us" />
          <Route element={<Careers />} path="/careers" />
          <Route path="/properties/:propertyId" element={<PropertyPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
    <WhatsAppWidget 
        phoneNumber="+2348058573915"
        message="Hello! I'm interested in learning more about Criterion Homes properties."
      />
    </>
  );
}

export default App;
