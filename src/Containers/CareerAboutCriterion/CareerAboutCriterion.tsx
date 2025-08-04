import classes from './CareerAboutCriterion.module.css';
import careerAbout from '../../Assets/Images/careerAbout.jpg';
import career1 from '../../Assets/Images/career1.png';
import career2 from '../../Assets/Images/career2.png';
import career3 from '../../Assets/Images/career3.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import Image from '../../Components/Image/Image';

const CareerAboutCriterion = () => {
	// Utils
	const whyWork = [
		'Collaborative and inclusive work environment',
		'Opportunities for professional growth and development',
		'Exciting and impactful projects',
	];

	const images = [
		{ src: career1, hash: 'LWHe8,D*nNtR~qR5IURjX.$%n$nh' },
		{ src: career2, hash: 'LCE{X;-;00M|00M{_4IU5[xu=?%M' },
		{ src: career3, hash: 'L4F5,GK,0K00OF.9~qMx00^+%2~q' },
	];

	// Effects
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	return (
		<section className={classes.container}>
			<Image
				src={careerAbout}
				alt='Career'
				loading='lazy'
				hash='LZK_B-Rk?wV@00WB9Yj@9Ft7I.t7'
				width={700}
				height={700}
				className={classes.headerImage}
			/>
			<div className={classes.textSection}>
				<p data-aos='fade-up'>
					At Criterion Homes, we're redefining the real estate landscape in
					Nigeria, one innovative project at a time. We believe that our
					greatest asset is our people. If you're passionate about real estate,
					driven by excellence, and eager to make a difference, we want to hear
					from you. Explore our current opportunities and start building a
					rewarding career with us.
				</p>
			</div>

			<div className={classes.whyWork}>
				<h4 data-aos='fade-up'>{'Why work with us?'.toUpperCase()}</h4>
				<div>
					{whyWork.map((data, i) => {
						return (
							<div key={i} data-aos='fade-up'>
								<h4>{i + 1}</h4>
								<p>{data.toUpperCase()}</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className={classes.imageSection} data-aos='fade-up'>
				{images.map((data, i) => {
					return (
						<React.Fragment key={i}>
							<Image
								src={data.src}
								alt='Careers'
								loading='lazy'
								hash={data.hash}
								adaptToParentDimensions
							/>
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};

export default CareerAboutCriterion;
