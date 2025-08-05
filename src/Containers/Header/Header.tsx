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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  // Context
  const { scrollToRef } = useContext(AppContext);

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  // Refs
  const sideNav = useRef<null | HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Utils
  const handleScroll = () => {
    const currentScrollY = window.scrollY || window.pageYOffset;
    if (currentScrollY > 400) {
      setNavBackground(isDark ? "#191919" : "#F4F4F4");
    } else {
      setNavBackground("transparent");
    }

    // Handle navbar visibility based on scroll direction
    if (currentScrollY < 100) {
      // Always show navbar at the top
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide navbar
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - show navbar
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to ensure navbar is visible when user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 150); // Show navbar 150ms after user stops scrolling
  };

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
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };

    // eslint-disable-next-line
  }, [lastScrollY]);
  return (
    <div
      className={`${classes.container} ${!isVisible ? classes.hidden : ''}`}
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
