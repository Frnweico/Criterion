import classes from "./HomeVideo.module.css";
import { useEffect, useRef } from "react";

const HomeVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    const tryPlay = async () => {
      if (video) {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay prevented:", err);
        }
      }
    };

    const handleWindowBlur = () => video?.pause();
    const handleWindowFocus = () => tryPlay();

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    tryPlay(); 

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  return (
    <div className={classes.container}>
      <video
        ref={videoRef}
        playsInline
        autoPlay
        loop
        muted
        controls={false}
      >
        <source
          src="https://res.cloudinary.com/dmpdhnjqs/video/upload/v1722662831/IMG_3859_blulhd.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default HomeVideo;
