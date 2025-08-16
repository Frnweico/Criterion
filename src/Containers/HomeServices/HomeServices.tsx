import classes from './HomeServices.module.css';
import Button from '../../Components/Button/Button';
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png"
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png"
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png"
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png"
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

const HomeServices = () => {
    const { scrollToRef } = useContext(AppContext);
    const homeServicesData = [
        {
            num: "01",
            title: "REAL ESTATE",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg1
        },
        {
            num: "02",
            title: "INVESTMENT",
            description: "Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele. Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.",
            img: serviceImg2
        },
        {
            num: "03",
            title: "INFRASTRUCTURE",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg3
        },
        {
            num: "04",
            title: "ADVISORY",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg4
        },
    ]
  return (
    <div className={classes.homeServices}>
        <div className={classes.homeServicesDetails}>
            <div className={classes.homeServicesLeftSection}>
                <h2 data-aos="fade-up"  className={classes.homeServicesHeading}>SERVICES</h2>
                <div data-aos="fade-up" className={classes.homeServicesImage}>
                    <img src={serviceImg1} alt="a block of houses" />
                </div>
            </div>
            <div data-aos="fade-up" className={classes.homeServicesRightSection}>
                <h2 className={classes.numberHeading}>02</h2>
                <h2  className={classes.investmentHeading}>INVESTMENT</h2>
                <p >Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele. </p>
                <p>Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.</p>
                <Button type='black' onClick={scrollToRef} >
                <span>TALK TO US</span>
                <svg
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='#000000'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
					</svg>
                </Button>
            </div>
        </div>

         <div className={`${classes.homeServicesDetailsMobile} `}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>02</h2>
                <h2 className={classes.investmentHeading}>INVESTMENT</h2>
                <p>Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele.Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.</p>
                <Button type='black' onClick={scrollToRef}>
                    <span>TALK TO US</span>
                    <svg width='16' height='14' viewBox='0 0 16 14' fill='#000000' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
                    </svg>
                </Button>
                <div className={classes.homeServicesImage}>
                    <img src={serviceImg1} alt="a block of houses" />
                </div>
            </div>
    </div>
  )
}

export default HomeServices