import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import MountLoader from "./Components/MountLoader/MountLoader";
import About from "./Containers/About/About";
import Careers from "./Containers/Careers/Careers";
import Home from "./Containers/Home/Home";
import PropertyPage from "./Containers/Properties/PropertyPage";

function App() {
  // Router
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MountLoader />}>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about-us" />
          <Route element={<Careers />} path="/careers" />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/properties" element={<PropertyPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
