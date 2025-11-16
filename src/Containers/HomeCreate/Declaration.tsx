import { useState } from "react";
import thumbnail from "../../Assets/Images/CD Thumbnail 2.jpg"
import classes from './HomeCreate.module.css';


const Declaration = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

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
        {/* Thumbnail with Play Button */}
        {!isPlaying && (
          <div className={classes.thumbnailWrapper} onClick={handlePlayClick}>
            <img 
              src={thumbnail} 
              alt="The Criterion Declaration" 
              className={classes.thumbnailImage}
            />
            <div className={classes.playButton}>
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 80 80" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="rgba(255, 255, 255, 0.9)" />
                <path 
                  d="M32 25L55 40L32 55V25Z" 
                  fill="#191919"
                />
              </svg>
            </div>
          </div>
        )}

        {/* YouTube Video */}
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/eLqRvw1euGY${isPlaying ? '?autoplay=1' : ''}`}
          title="The Criterion Declaration"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: isPlaying ? 'block' : 'none' }}
        />
      </div>

    </div>

  )
}

export default Declaration
