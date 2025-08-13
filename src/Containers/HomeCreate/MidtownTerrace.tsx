import classes from './HomeCreate.module.css';
import midtownTerrace1 from "../../Assets/Images/midtownTerrace1.svg"
// import midtownTerrace2 from "../../Assets/Images/Project Section - Main Image.png"
import midtownTerrace2 from "../../Assets/Images/midtownTerrace2.svg"
import Button from '../../Components/Button/Button';
import line from "../../Assets/Images/Line 2.svg"
import { useNavigate } from 'react-router-dom';
import { scrollToTheTop } from '../../HelperFunctions/scrollToTop';

const MidtownTerrace = () => {
    const navigate = useNavigate();
    const midtownData = [
        {
            id: 1,
            title: "LOCATION",
            description: "Gwarimpa II Estate. Abuja"
        },
        {
            id: 2,
            title: "TERRACE DUPLEXES",
            description: "4 exclusively built 4-bedroom terrace duplexes \+ atrium for light and ventilation",
        },
        {
            id: 3,
            title: "EXTRA FEATURE",
            description: "All units' bedrooms come with spacious balconies",
        },
    ]
  return (
    <div>
    <div className={classes.midtownTerraceContainer}>
        <div data-aos="fade-up" className={classes.midtownTextSection}>
            <div className={classes.midtownTextLineWrapper}>
            <h2 className={classes.midtownHeading} >THE <br /> MIDTOWN TERRACES</h2>
            <h2 className={classes.midtownHeadingMobile} >THE MIDTOWN <br /> TERRACES</h2>
            <div className={classes.midtownTextLine}>
                <img src={line} alt="a line" />
                <p>Gwarinpa, Abuja</p>
            </div>
            </div>
            <div className={classes.midtownText}>
            <img src={midtownTerrace1} alt="midtown terrace" />
            <Button type='orange' onClick={() => {
          navigate("/properties"); scrollToTheTop();
        }}>
                <span>LEARN MORE</span>
                 <svg
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='#f4f4f4'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
					</svg>
            </Button>
            <p data-aos="fade-up">The Midtown Residences is a thoughtfully designed three-storey apartment development that blends clean architectural lines with modern functionality. Positioned in a serene urban enclave, this project was conceived for residents who value simplicity, space, and intentional living.</p>
            </div>
        </div>
        <div className={classes.midtownImageSection}>
            <div>
            <img src={midtownTerrace2} alt="Midtown Terrace" />
            </div>
            <div className={classes.midtownDetailsWrapper}>
                {midtownData.map((item) => (
                    <div data-aos = "fade-up" key={item.id} className={classes.midtownDetails}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      
    </div>
    </div>
  )
}

export default MidtownTerrace
