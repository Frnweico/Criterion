import { useContext, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import classes from "./MountLoader.module.css";

const MountLoader = () => {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <section className={classes.container}>
        <video autoPlay loop muted playsInline>
          <source src="/videos/loader.mp4" type="video/mp4" />
        </video>
      </section>
    );
  }

  // 👇 Suspense fallback prevents white flash while lazy components load
  return (
    <Suspense
      fallback={
        <section className={classes.container}>
          <video autoPlay loop muted playsInline>
            <source src="/videos/loader.mp4" type="video/mp4" />
          </video>
        </section>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default MountLoader;
