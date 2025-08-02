import Button from '../../Components/Button/Button';
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';
import { useContext } from 'react';
import classes from './HomeCreate.module.css';
import Declaration from './Declaration';
import createImg from "../../Assets/Images/Tomorrows Spaces Section - Image.png";

const HomeCreate = () => {
    const { scrollToRef } = useContext(AppContext);
  return (
    <div className={classes.container}>
        <div className={classes.createContainer}>    
        <div className={classes.homeCreateMain}>
<h2 data-aos="fade-up" className={classes.heading}>
  CREATING <br />
  <motion.span >
    TOMORROW'S
  </motion.span> <br />
  <motion.span >
    SPACES, INSPIRED
  </motion.span> <br />
  <motion.span >
    BY TODAY'S NEEDS
  </motion.span>
</h2>

                <div className={classes.textSection}>
        <div data-aos="fade-up" className={classes.mainTextWrapper}>
            <div className={classes.mainText}>
            <p>At Criterion Homes, we see real estate as a lasting commitment — to time, to precision, and to the quiet dignity of well-made spaces. We believe homes should serve people, not trends.</p>
            <p>At their best, homes are mirrors of what we value: that care is a craft, and longevity is the mark of true intention.</p>
            <p>We create with purpose — honouring your time, elevating the human experience, and reflecting a deeper standard of living.</p>
            <p>Through restraint, detail, and clarity of thought, we aim to set a benchmark for spaces that endure, serve, and mean something over time.</p>
</div>
            <div className={classes.checkFutureWrapper}>
                <Button onClick={scrollToRef} type='plain'>
                <span>READ ABOUT US</span>
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
        </div>
<div className={classes.CreateImg}>
                <img src={createImg} alt="an apartment building" />
            </div>
    </div>

    <Declaration />
    </div>
  )
}

export default HomeCreate
