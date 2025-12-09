import classes from "./HomeServices.module.css";
import Button from "../../Components/Button/Button";
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png";
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png";
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png";
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Service = {
  num: string;
  title: string;
  description: string;
  img: string;
};

const HomeServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const homeServicesData: Service[] = [
    {
      num: "01",
      title: "REAL ESTATE",
      description:
        "Choose more than a building, choose a home that reflects your personal standard. Live in a space that values distinction, where every detail is held to a high measure. Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
      img: serviceImg1,
    },
    {
      num: "02",
      title: "INVESTMENT",
      description:
        "Your investments should reflect the same standards you apply to the rest of your life. Choose investment opportunities guided by a principle of value that goes beyond profit; delivering returns that are financially sound, future-proof, and worthy of your portfolio.",
      img: serviceImg2,
    },
    {
      num: "03",
      title: "INFRASTRUCTURE",
      description:
        "Great living isn't just about where you are. It's about how everything around you supports it. Let every detail work in harmony with the life you lead. Choose infrastructure that quietly shapes environments to elevate everyday living.",
      img: serviceImg3,
    },
    {
      num: "04",
      title: "ADVISORY",
      description:
        "When your choices carry weight, your counsel should too. Get private, tailored advisory services that help you navigate property, investments, and landmark projects with clarity and confidence. Every recommendation reflects an understanding of your priorities, guided by a measure that doesn't entertain anything but the standard.",
      img: serviceImg4,
    },
  ];

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  useEffect(() => {
    const imageUrls = [serviceImg1, serviceImg2, serviceImg3, serviceImg4];
    let loadedCount = 0;
    const checkLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) setImagesLoaded(true);
    };
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    });
  }, []);

  useLayoutEffect(() => {
    if (!imagesLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = sectionsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!container || sections.length === 0) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      const mm = gsap.matchMedia();

      const createAnimation = (isMobile: boolean) => {
        // 1. SETUP: 
        // Service 1 (index 0) is visible immediately (yPercent: 0).
        // Services 2, 3, 4 are hidden below (yPercent: 100).
        sections.forEach((section, i) => {
          gsap.set(section, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: i + 1,
            yPercent: i === 0 ? 0 : 100, // <--- CRITICAL: Index 0 starts visible
            opacity: 1,
            visibility: "visible",
            willChange: "transform, opacity",
          });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
        });

        // 2. ANIMATION LOOP
        // Start from index 1 (Service 2). We do NOT animate Service 1 IN.
        // We only animate it OUT as Service 2 covers it.
        sections.forEach((section, i) => {
          if (i === 0) return; // Skip the first card loop
          
          const prevSection = sections[i - 1];

          // Move New Card UP
          tl.to(section, {
            yPercent: 0,
            duration: 1,
          });

          // Fade Previous Card OUT (Parallax effect)
          tl.to(
            prevSection,
            {
              yPercent: -20, // Small drift up
              opacity: 0,    // Fade out
              duration: 1,
            },
            "<" // Sync exactly
          );
        });

        // 3. SCROLL CONFIG
        // Since Service 1 is static, we have 1 less transition to scroll through.
        // We reduce the multiplier slightly to keep it responsive.
        const transitionCount = sections.length - 1; // 3 transitions
        const multiplier = isMobile ? 4 : 3;
        const totalHeight = window.innerHeight * (transitionCount * multiplier);

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${totalHeight}`,
          pin: true,
          pinSpacing: true,
          
          // FIX FOR SNAP & GAP:
          // 'true' binds animation 1:1 to scrollbar. 
          // No lag = No gap at the bottom. No momentum fight = No snap at the top.
          scrub: true, 
          
          fastScrollEnd: true,
          anticipatePin: 0, // Disabled to prevent jump
          invalidateOnRefresh: true,
          animation: tl,
        });
      };

      mm.add("(min-width: 769px)", () => createAnimation(false));
      mm.add("(max-width: 768px)", () => createAnimation(true));

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.homeServicesWrapper}>
      <div className={classes.servicesFixedHeading} ref={headingRef}>
        <h2 className={classes.homeServicesHeading}>SERVICES</h2>
      </div>

      <div
        className={classes.homeServices}
        ref={containerRef}
        style={{ height: "100dvh", position: "relative", overflow: "hidden" }}
      >
        {homeServicesData.map((service, index) => (
          <div
            key={service.title}
            className={classes.serviceSection}
            ref={(el) => addToRefs(el, index)}
          >
            <div className={classes.serviceContent}>
              <div className={classes.homeServicesDetails}>
                <div className={classes.homeServicesLeftSection}>
                  <div className={classes.homeServicesImage}>
                    <img
                      src={service.img}
                      alt={`${service.title} service`}
                      loading="eager"
                    />
                  </div>
                </div>
                <div className={classes.homeServicesRightSection}>
                  <h2 className={classes.numberHeading}>{service.num}</h2>
                  <h2 className={classes.investmentHeading}>{service.title}</h2>
                  <p>{service.description}</p>
                  <Button
                    type="black"
                    onClick={() =>
                      gsap.to(window, { duration: 1, scrollTo: "#contact" })
                    }
                  >
                    <span>TALK TO US</span>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="#000000">
                      <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className={classes.homeServicesDetailsMobile}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>{service.num}</h2>
                <h2 className={classes.investmentHeading}>{service.title}</h2>
                <p>{service.description}</p>
                <Button type="black" onClick={scrollToContact}>
                  <span>TALK TO US</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="#000000">
                    <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                  </svg>
                </Button>
                <div className={classes.homeServicesImage}>
                  <img src={service.img} alt={`${service.title} service`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServices;