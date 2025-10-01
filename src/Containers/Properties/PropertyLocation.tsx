import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import classes from "./PropertyPage.module.css";
import line9 from "../../Assets/Images/Line 9.svg";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import type { LocationData } from "./property.types";

interface PropertyLocationProps {
  data: LocationData;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ data }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Map styling:
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
            <h2 data-aos="fade-up">{data.title}</h2>
            <div className={classes.projectLocationTextLine}>
              <h2 data-aos="fade-up">{data.subtitle}</h2>
              <img src={line9} alt="line" />
              <p data-aos="fade-up">{data.tagline}</p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className={classes.projectLocationTextDescription}
          >
            {data.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={classes.projectLocationMapWrapper}>
          <LoadScript googleMapsApiKey="AIzaSyDRpgfp7VddZqdlnBugzE4xDdNP9YHufHs">
            <GoogleMap
              mapContainerClassName={classes.mapPreview}
              center={data.coordinates}
              zoom={15}
              options={{
                styles: mapStyles,
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              <Marker position={data.coordinates} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;
