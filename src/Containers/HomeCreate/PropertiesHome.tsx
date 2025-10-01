import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTheTop } from '../../HelperFunctions/scrollToTop';
import classes from './PropertiesHome.module.css';
import urbanNestMain from "../../Assets/Images/propertiesHomeMainImg.png";
import propertiesHomeImg1 from "../../Assets/Images/propertiesHomeImg1.png";
import midtownTerraceMain from "../../Assets/Images/midtownMainImg.png";
import midtownTerrace1 from "../../Assets/Images/xV1.jpg"
import Button from '../../Components/Button/Button';
import Aos from "aos";
import "aos/dist/aos.css";

interface Property {
  location: string;
  title: string;
  mainImg: string;
  description: string;
}

interface Properties {
  [key: string]: Property; 
}

const PropertiesHome = () => {
    const navigate = useNavigate();
    const [spotlightProperty, setSpotlightProperty] = useState<string>('urbanNest');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const properties: Properties = {
        urbanNest: {
            location: 'Wuse, Zone 7, Abuja',
            title: 'THE URBAN NEST',
           mainImg: propertiesHomeImg1,
            description: `The Urban Nest places you at the center of Abuja. Set within one of Abuja’s most coveted district, it offers a rare balance of seclusion and connection, where ease meets aspiration. Perfect for individuals and families with a refined eye, who seek a property that reflects taste, confidence, and a life lived with distinction.`,
        },
        midtownTerraces: {
            location: 'Gwarinpa, Abuja',
            title: 'THE MIDTOWN TERRACES',
           mainImg: midtownTerrace1,
            description: `The Midtown Residences is a thoughtfully designed three-storey apartment development that blends clean architectural lines with modern functionality. Positioned in a serene urban enclave, this project was conceived for residents who value simplicity, space, and intentional living.`,
        },
    };

   const toggleSpotlightProperty = () => {
        setSpotlightProperty(prev => prev === 'urbanNest' ? 'midtownTerraces' : 'urbanNest');
    };

    const handleViewProperty = () => {
        navigate(`/properties/${spotlightProperty === 'urbanNest' ? 'urban-nest' : 'midtown-terraces'}`); 
        scrollToTheTop();
    };

    const getBackgroundImage = (propertyKey: string) => {
        if (isMobile) {
            return properties[propertyKey].mainImg;
        }
        return propertyKey === 'urbanNest' ? urbanNestMain : midtownTerraceMain;
    };

    const currentProperty = properties[spotlightProperty];
    const nextProperty = properties[spotlightProperty === 'urbanNest' ? 'midtownTerraces' : 'urbanNest'];
    const nextPropertyKey = spotlightProperty === 'urbanNest' ? 'midtownTerraces' : 'urbanNest';

    return (
        <section className={classes.propertiesHome}>
            <h1>PROPERTIES</h1>
            <div className={classes.propertiesHomeContainer}>
                <div style={{ backgroundImage: `url(${spotlightProperty === 'urbanNest' ? urbanNestMain : midtownTerraceMain})` }} 
                    className={classes.mainImageSection}
                >
                    <div className={classes.mainImageText}>
                        <div className={classes.mainImageTextHeader}>
                            <p>{properties[spotlightProperty].location}</p>
                            <h2>{properties[spotlightProperty].title}</h2>
                        </div>
                        <div className={classes.mainImage}>
                            <img src={properties[spotlightProperty].mainImg} alt={`${properties[spotlightProperty].title} img`} />
                        </div>
                        <div className={classes.mainImageTextDescription}>
                        <Button type='lemon' onClick={handleViewProperty}>
                            <span> VIEW PROPERTY</span>
                            <svg
                                width='16'
                                height='14'
                                viewBox='0 0 16 14'
                                fill='#f4f4f4'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
                            </svg>
                        </Button>
                        <p>{properties[spotlightProperty].description}</p>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${getBackgroundImage(nextPropertyKey)})` }}  className={`${classes.nextProjectSection}`}>
                    <div className={classes.overlay}></div>
                    <div className={classes.nextProjectContent}>
                        <div>
                        <p>NEXT PROJECT</p>
                         <p>{properties[spotlightProperty === 'urbanNest' ? 'midtownTerraces' : 'urbanNest'].location}</p>
                        <h2>{properties[spotlightProperty === 'urbanNest' ? 'midtownTerraces' : 'urbanNest'].title}</h2>
                        </div>
                        <Button type='yellow' onClick={toggleSpotlightProperty}>
                            <span> VIEW</span>
                            <svg
                                width='16'
                                height='14'
                                viewBox='0 0 16 14'
                                fill='#f4f4f4'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PropertiesHome;