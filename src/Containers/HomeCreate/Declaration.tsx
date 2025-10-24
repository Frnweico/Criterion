// import { Link } from 'react-router-dom';
// import Button from '../../Components/Button/Button';
import classes from './HomeCreate.module.css';
const Declaration = () => {
  return (
    <div className={classes.declarationContainer}>
      <div className={classes.declaration}>
        {/* ghghcghg  */}
    {/*  <h2><sup className={classes.declarationSup}>THE</sup> <span >CRITERION</span> <br />DECLARATION</h2>

 <div className={classes.declarationText}>
      <p>The Criterion Declaration is our statement of intent.<br />
A philosophy that defines how we build, why we build, and who we build for. It reflects our commitment to thoughtful design, disciplined delivery, sustainability and homes created to hold their worth over time. <br /> It's not a campaign. Not a slogan. A standard.</p>
<Button type='white'>
                <Link to={"https://youtu.be/eLqRvw1euGY"} target='_blank'>WATCH THE DECLARATION</Link>
                <svg
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='#000000'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
					</svg>
                    </Button>
    </div> */}
</div>

<div className={classes.declarationVideo}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/eLqRvw1euGY"
            title="The Criterion Declaration"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

    </div>

  )
}

export default Declaration
