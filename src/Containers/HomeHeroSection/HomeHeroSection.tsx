import Button from '../../Components/Button/Button';
import classes from './HomeHeroSection.module.css';
import heroImage from '../../Assets/Images/CHOme 2 1_cutout 2.png';
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';
import { useContext} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomeHeroSection = () => {
	// Context
	const { scrollToRef } = useContext(AppContext);
// 	 const sectionRef  = useRef(null);  
//   const textRef     = useRef(null);   
//   const imageRef    = useRef(null);  
  

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
				<Button onClick={scrollToRef} type='lemon' subType='normal'>
					<span>TALK TO US</span>
					<svg
						width='17'
						height='15'
						viewBox='0 0 16 14'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
					</svg>
				</Button>
			</motion.div>

	<div className={classes.imageContainer}>
				<img
					src={heroImage}
					alt='Criterion Homes Architecture'
					loading='lazy'
					className={classes.desktopImage}
				/>
				<img
					src={heroImage}
					alt='Criterion Homes Architecture'
					loading='lazy'
					className={classes.mobileImage}
				/>
			</div>
		</section>
	);
};

export default HomeHeroSection;
