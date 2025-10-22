import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
// import { routes } from '../../Utilities/routes';
import classes from './Footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logoLarge from '../../Assets/Images/logoLarge.svg';
import { scrollToTheTop } from '../../HelperFunctions/scrollToTop';
import { Facebook } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { footerRoutes } from '../../Utilities/footerRoutes';

export const openExternalLink = (link: string) => {
	if (link) {
		window.open(link);
	}
};

const Footer = () => {
	// Context
	const { emailSignUp, requestState } = useContext(AppContext);

	// State
	const [emailAddress, setEmailAddress] = useState('');

	// Effects
	useEffect(() => {
		if (requestState?.data) {
			setEmailAddress('');
		}
	}, [requestState?.data]);

	const handleFooterLinkClick = (route: string, isExternal: boolean) => {
		if (isExternal) {
			window.open(route, '_blank');
		} else {
			scrollToTheTop();
		}
	};

	return (
		<div className={classes.container}>
			<div className={classes.topSection}>
				<div className={classes.topSectionMain}>
				<h4>STAY ONE STEP AHEAD</h4>
				<p>Get exclusive property listings, smart tips and market updates delivered straight to your inbox. <br /><span>Sign up for our newsletter today.</span></p>
				</div>
				<div>
					<input
						type='text'
						name='email'
						onChange={(e) => {
							setEmailAddress(e.target.value);
						}}
						value={emailAddress}
						placeholder='Email Address'
					/>
					<Button
						type="footerBtn"
						subType='gold'
						disabled={!emailAddress}
						loading={requestState.isLoading}
						onClick={() => emailSignUp(emailAddress)}>
						<span>SUBMIT</span>
						<svg
							width='16'
							height='15'
							viewBox='0 0 16 15'
							fill='#f4f4f4'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M8.86014 0.575684L7.57815 1.84655L12.4829 6.56675H-0.00292969V8.35087H12.4769L7.57815 13.0653L8.86014 14.3362L15.9971 7.45606L8.86014 0.575684Z' />
						</svg>
					</Button>
				</div>
			</div>

			<div className={classes.middleSection}>
				<div>
					{footerRoutes.map((data, i) => {
						if (data.isExternal) {
							return (
								<a
									key={i}
									href={data.route}
									target='_blank'
									rel='noopener noreferrer'
									style={{ cursor: 'pointer' }}>
									{data.title}
								</a>
							);
						}
						return (
							<Link to={data.route} key={i} onClick={scrollToTheTop}>
								{data.title}
							</Link>
						);
					})}
					{/* <Link
						to='https://drive.google.com/file/d/1KtJxkCViVfCnSWYAcuvd82-CGjaNISaC/view?pli=1'
						target='_blank'>
						{'view profile'.toUpperCase()}
					</Link> */}
				</div>

				<div>
					<a href='mailto:info@criterionhomesltd.com'>
						info@criterionhomesltd.com
					</a>
					<a href='tel:+2348058573915'>+2348058573915</a>
					<p>Machima Plaza, Mambolo Junction, Wuse Zone 2, FCT Abuja</p>
				</div>

        <div className={classes.socials}>
		  <InstagramIcon
			onClick={() => {
			  openExternalLink("https://www.instagram.com/criterionhomesltd/");
			}}
			style={{ cursor: 'pointer' }}
		  />
		  <Facebook
			onClick={() => {
			  openExternalLink(
				"https://www.facebook.com/share/cMp5ZRTE8eYBNGH4/?mibextid=LQQJ4d"
			  );
			}}
			style={{ cursor: 'pointer' }}
		  />

					<XIcon
						onClick={() => {
							openExternalLink('https://x.com/CriterionHomes_');
						}} style={{ cursor: 'pointer' }}
					/>
					<LinkedInIcon
						onClick={() => {
							openExternalLink(
								'https://www.linkedin.com/company/criterion-homes-ltd/'
							);
						}} style={{ cursor: 'pointer' }}
					/>
				</div>
			</div>

			<div className={classes.logoSection}>
				<img src={logoLarge} alt='Criterion' loading='lazy' />
			</div>

			<div className={classes.copySection}>
				&copy; Criterion Homes 2024 | All Rights Reserved
			</div>
		</div>
	);
};

export default Footer;
