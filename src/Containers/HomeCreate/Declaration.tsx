import Button from '../../Components/Button/Button';

import classes from './HomeCreate.module.css';
const Declaration = () => {
  return (
    <div className={classes.declarationContainer}>
      <h2><sup>THE</sup> <span >CRITERION</span> <br />DECLARATION</h2>

<div className={classes.declarationText}>
      <p>The Criterion Declaration is our statement of intent.
A philosophy that defines how we build, why we build, and who we build for. It reflects our commitment to thoughtful design, disciplined delivery, sustainability and homes created to hold their worth over time. Not a campaign. Not a slogan. A standard.</p>
<Button type='white'>
                <span>WATCH THE DECLARATION</span>
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

  )
}

export default Declaration
