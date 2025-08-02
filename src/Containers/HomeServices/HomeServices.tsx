import classes from './HomeServices.module.css';
import Button from '../../Components/Button/Button';
import homeServiceImg from '../../Assets/Images/homeServiceImg.svg';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
const HomeServices = () => {
    const { scrollToRef } = useContext(AppContext);
  return (
    <div className={classes.homeServices}>
        <h2 data-aos="fade-up" className={classes.homeServicesHeading}>SERVICES</h2>
        <div className={classes.homeServicesDetails}>
            <div className={classes.homeServicesImage}>
                <h2>02</h2>
                <img src={homeServiceImg} alt="a block of houses" />
            </div>
            <div className={classes.homeServicesText}>
                <h2 data-aos="fade-up">INVESTMENT</h2>
                <p data-aos="fade-up">Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele. Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.</p>
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
    </div>
  )
}

export default HomeServices
