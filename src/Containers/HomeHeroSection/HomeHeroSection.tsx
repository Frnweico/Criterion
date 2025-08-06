import Button from '../../Components/Button/Button';
import classes from './HomeHeroSection.module.css';
import heroImage from '../../Assets/Images/CHOme 2 1_cutout 2.png';
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';
import { useContext } from 'react';
import heroMobile from '../../Assets/Images/heroMobile.jpg';
import Image from '../../Components/Image/Image';

const HomeHeroSection = () => {
	// COntext
	const { scrollToRef } = useContext(AppContext);
	return (
		<section className={classes.container}>
			<motion.div className={`${classes.textSection}`}>
				<h4 data-aos="fade-up"><span>THE<span className={classes.mazius}> MEASURE</span></span> 
				<motion.span>
					OF HOW HOMES <br />
					</motion.span>
					<motion.span className={classes.mazius}>
					SHOULD BE BUILT
					</motion.span>
				</h4>

				<p className = {classes.text}>A PHILOSPHY OF CRAFT, RESTRAINT, SUSTAINABILITY AND TIMELESS VALUE.</p>
				<Button onClick={scrollToRef} type='secondary' subType='normal'>
					<span>TALK TO US</span>
					<svg
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
					</svg>
				</Button>
			</motion.div>

{/* <div className={classes.imageSection}> */}

			<img
				src={heroImage}
				alt='Develop'
				loading='lazy'
				className={classes.desktopImage}
			/>
			<img
				src={heroMobile}
				alt='Hero'
				loading='lazy'
				className={classes.mobileImage}
			/>
			{/* </div> */}
		</section>
	);
};

export default HomeHeroSection;
