import classes from "./PropertyPage.module.css";
import line9 from "../../Assets/Images/Line 9.svg";

const PropertyLocation = () => {
  return (
            <div className={classes.projectLocation}>
           <h3>LOCATION</h3>
           <div className={classes.projectLocationGrid}>
           <div className={classes.projectLocationText}>
            <div>
            <h2>GWARINPA,</h2>
            <div className={classes.projectLocationTextLine}>
            <h2>ABUJA</h2>
            <img src={line9} alt="line" />
            <p>Prime, secure, and highly sought-after district</p>
            </div>
            </div>

            <div className={classes.projectLocationTextDescription}>
              <p>Gwarinpa remains one of Abuja’s most established and desirable residential districts; a mature, well-planned enclave that offers both urban connectivity and lasting value. Its location in the third phase of the country’s capital city ensures direct access to key zones like Jabi, Life Camp, and the city centre, while wide boulevards and consistent infrastructure reflect a neighbourhood designed for longevity.</p>
              <p>Supported by reputable schools, medical facilities, retail, and hospitality, Gwarinpa delivers a complete living experience within a self-sufficient setting. With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.</p>
            </div>
           </div>
           <div className={classes.projectLocationMapWrapper}>
  <a
    href="https://www.google.com/maps/place/Plot+237,+Gwarinpa+II+Estate,+Abuja/"
    target="_blank"
    rel="noopener noreferrer"
    className={classes.mapOverlay}
  >
    <iframe
      title="Midtown Terrace Location"
      className={classes.mapPreview}
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDRpgfp7VddZqdlnBugzE4xDdNP9YHufHs&q=Plot+237,+Gwarinpa+II+Estate,+Abuja"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </a>
</div>
        </div>
        </div>
  )
}

export default PropertyLocation
