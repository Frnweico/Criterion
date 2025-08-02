import classes from "./Header.module.css";
import logo from "../../Assets/Images/logo.svg";
import logoLight from "../../Assets/Images/logoLight.svg";
import { routes } from "../../Utilities/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { scrollToTheTop } from "../../HelperFunctions/scrollToTop";
import HeaderSideNav from "../HeaderSideNav/HeaderSideNav";
import { AppContext } from "../../Context/AppContext";

type HeaderProps = {
  isDark?: boolean;
};

const Header = ({ isDark }: HeaderProps) => {
  // States
  const [navBackground, setNavBackground] = useState("transparent");

  // Context
  const { scrollToRef } = useContext(AppContext);

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  // Utils
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 400) {
      setNavBackground(isDark ? "#191919" : "#F4F4F4");
    } else {
      setNavBackground("transparent");
    }
  };

  // Refs
  const sideNav = useRef<null | HTMLDivElement>(null);

  // Router

  // Utils
  const openSideNav = () => {
    if (sideNav.current) {
      sideNav.current.style.width = "100%";
    }
  };

  const closeSideNav = () => {
    if (sideNav.current) {
      sideNav.current.style.width = "0%";
    }
  };

  // Effects
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line
  }, []);
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: navBackground }}
    >
      <img
        src={isDark ? logoLight : logo}
        alt="Criterion"
        loading="lazy"
        onClick={() => {
          navigate("/");
        }}
      />

      {routes.map((data, i) => {
        return (
          <Link
            to={data.route}
            key={i}
            onClick={scrollToTheTop}
            className={`${
              location.pathname === data.route ? classes.active : undefined
            } ${isDark ? classes.darkColor : classes.lightColor}`}
          >
            {data.title}
          </Link>
        );
      })}
      <p
        onClick={scrollToRef}
        className={`${isDark ? classes.darkColor : classes.lightColor}`}
      >
        CONTACT US
      </p>

      <Button type='secondary' subType='gold'
        onClick={() => {
          window.open(
            "https://drive.google.com/file/d/1KtJxkCViVfCnSWYAcuvd82-CGjaNISaC/view?pli=1"
          );
        }}
      >
        <span>{"view profile".toUpperCase()}</span>
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.86307 0.17041L7.58108 1.44128L12.4858 6.16148H0V7.94559H12.4798L7.58108 12.66L8.86307 13.9309L16 7.05078L8.86307 0.17041Z" />
        </svg>
      </Button>

      <div className={classes.sidenavOpener} onClick={openSideNav}>
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.48535 17.0278V0.837402"
            stroke="#F4F4F4"
            strokeWidth="1.58476"
          />
          <path
            d="M16.5801 8.93262L0.389648 8.93262"
            stroke="#F4F4F4"
            strokeWidth="1.58476"
          />
        </svg>
      </div>

      <div className={classes.sideNav} ref={sideNav}>
        <HeaderSideNav closeSideNav={closeSideNav} />
      </div>
    </div>
  );
};

export default Header;
