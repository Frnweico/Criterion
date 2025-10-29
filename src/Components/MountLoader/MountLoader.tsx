import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
// import loaderGif from "../../Assets/Gifs/loader.gif";
import classes from "./MountLoader.module.css";

const MountLoader = () => {
  //   Context
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <section className={classes.container}>
        {/* <img src={loaderGif} alt="Loader"  loading="lazy"/> */}
        <video
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/videos/loader.mp4" type="video/mp4" />
  </video>
      </section>
    );
  } else {
    return <Outlet />;
  }
};

export default MountLoader;
