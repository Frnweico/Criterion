import { Link, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { routes } from "../../Utilities/routes";
import classes from "./HeaderSideNav.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { scrollToTheTop } from "../../HelperFunctions/scrollToTop";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";
import { openExternalLink } from "../Footer/Footer";
import { Facebook } from "@mui/icons-material";

type HeaderSideNavProps = {
  closeSideNav: () => void;
};

const HeaderSideNav = ({ closeSideNav }: HeaderSideNavProps) => {
  // Context
  const { scrollToRef } = useContext(AppContext);

  // Router
  const location = useLocation();

  function closeSideNavButtons(){
    scrollToTheTop();
    closeSideNav();
  }

  function closeContactButton(){
    scrollToRef();
    closeSideNav();
  }

  return (
    <section className={classes.container}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={closeSideNav}
      >
        <path
          d="M23.7716 23.7699L8.23047 8.22876"
          stroke="#DC7322"
          strokeWidth="2.15131"
        />
        <path
          d="M23.7716 8.22913L8.23047 23.7703"
          stroke="#DC7322"
          strokeWidth="2.15131"
        />
      </svg>

      <div className={classes.routesSection}>
        {routes.map((data, i) => {
          return (
            <Link
              to={data.route}
              key={i}
              onClick={closeSideNavButtons}
              className={`${
                location.pathname === data.route ? classes.active : undefined
              }`}
            >
              {data.title}
            </Link>
          );
        })}
        <p onClick={closeContactButton}>CONTACT US</p>

        <Button
           onClick={() => { window.open("/documents/Criterion Homes Profile.pdf", "_blank")
  }}
        >
          <span>{"view profile".toUpperCase()}</span>
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.86307 0.963867L7.58108 2.23473L12.4858 6.95494H0V8.73905H12.4798L7.58108 13.4535L8.86307 14.7244L16 7.84424L8.86307 0.963867Z" />
          </svg>
        </Button>

        <div className={classes.socialSection}>
          <InstagramIcon
            onClick={() => {
              openExternalLink("https://www.instagram.com/criterionhomesltd/");
            }}
          />
          <Facebook
            onClick={() => {
              openExternalLink(
                "https://www.facebook.com/share/cMp5ZRTE8eYBNGH4/?mibextid=LQQJ4d"
              );
            }}
          />
          <XIcon
            onClick={() => {
              openExternalLink("https://x.com/CriterionHomes_");
            }}
          />
          <LinkedInIcon
            onClick={() => {
              openExternalLink(
                "https://www.linkedin.com/company/criterion-homes-ltd/"
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderSideNav;
