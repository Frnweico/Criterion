import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import classes from "./PropertyPage.module.css";
import line9 from "../../Assets/Images/Line 9.svg";
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';

const PropertyLocation = () => {
  useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

  // Coordinates for Plot 237 (you should geocode your address for accuracy)
  const center = { lat: 9.1136, lng: 7.3946 }; // Example for Gwarinpa, Abuja

  // Map styling: desaturated / grey look
  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#dcdcdc" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
  ];

  return (
            <div className={classes.projectLocation}>
           <h3>LOCATION</h3>
           <div className={classes.projectLocationGrid}>
           <div className={classes.projectLocationText}>
            <div>
            <h2 data-aos= "fade-up">GWARINPA,</h2>
            <div className={classes.projectLocationTextLine}>
            <h2 data-aos= "fade-up">ABUJA</h2>
            <img src={line9} alt="line" />
            <p data-aos= "fade-up">Prime, secure, and highly sought-after district</p>
            </div>
            </div>

            <div data-aos= "fade-up" className={classes.projectLocationTextDescription}>
              <p>Gwarinpa remains one of Abuja’s most established and desirable residential districts; a mature, well-planned enclave that offers both urban connectivity and lasting value. Its location in the third phase of the country’s capital city ensures direct access to key zones like Jabi, Life Camp, and the city centre, while wide boulevards and consistent infrastructure reflect a neighbourhood designed for longevity.</p>
              <p>Supported by reputable schools, medical facilities, retail, and hospitality, Gwarinpa delivers a complete living experience within a self-sufficient setting. With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.</p>
            </div>
           </div>
           <div className={classes.projectLocationMapWrapper}>
 <LoadScript googleMapsApiKey="AIzaSyDRpgfp7VddZqdlnBugzE4xDdNP9YHufHs">
            <GoogleMap
              mapContainerClassName={classes.mapPreview}
              center={center}
              zoom={15}
              options={{
                styles: mapStyles,
                disableDefaultUI: true, // hides all default controls
                zoomControl: true, // keep zoom if you want
              }}
            >
              {/* Marker at location  */}
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
</div>
        </div>
        </div>
  )
}

export default PropertyLocation
