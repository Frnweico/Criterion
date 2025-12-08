import classes from "./HomeServices.module.css";
import Button from "../../Components/Button/Button";
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png";
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png";
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png";
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png";
import { useRef, useLayoutEffect } from "react";
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
        "Great living isn’t just about where you are. It’s about how everything around you supports it. Let every detail work in harmony with the life you lead. Choose infrastructure that quietly shapes environments to elevate everyday living.",
      img: serviceImg3,
    },
    {
      num: "04",
      title: "ADVISORY",
      description:
        "When your choices carry weight, your counsel should too. Get private, tailored advisory services that help you navigate property, investments, and landmark projects with clarity and confidence. Every recommendation reflects an understanding of your priorities, guided by a measure that doesn’t entertain anything but the standard.",
      img: serviceImg4,
    },
  ];

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = sectionsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!container || sections.length === 0) return;

      const setVh = () => {
        const h = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
      };
      setVh();

      sections.forEach((section) => {
        gsap.set(section, { clearProps: "all" });
      });

      gsap.killTweensOf(sections);

      const buildAnimation = () => {
        sections.forEach((section, i) => {
          gsap.set(section, {
            position: "absolute",
            inset: 0,
            yPercent: i === 0 ? 0 : 100,
            zIndex: sections.length - i,
            opacity: 1,
            willChange: "transform, opacity",
            force3D: true,
            backfaceVisibility: "hidden",
            visibility: "visible",
          });
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
          },
        });

        sections.forEach((section, i) => {
          if (i === 0) return;

          const prevSection = sections[i - 1];
          const timeStart = i - 1;

          tl.to(
            section,
            {
              yPercent: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            timeStart
          ).to(
            prevSection,
            {
              yPercent: -100,
              opacity: 0.142,
              duration: 0.8,
              ease: "power1.out",
            },
            timeStart + 0.2
          );
        });

        return tl;
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const timeline = buildAnimation();
        const steps = sections.length - 1;

        const st = ScrollTrigger.create({
          trigger: container,
          start: `top top`,
          end: `+=${steps * 180}vh`,
          pin: container,
          pinSpacing: true,
          scrub: 1.5,
          // anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: timeline,
          
        });
        return () => st.kill();
      });

      // Mobile: Keep existing working implementation
      mm.add("(max-width: 768px)", () => {
        sections.forEach((section, i) => {
          gsap.set(section, {
            position: "absolute",
            inset: 0,
            yPercent: i === 0 ? 0 : 100,
            zIndex: sections.length - i,
            opacity: 1,
            willChange: "transform, opacity",
            force3D: true,
            backfaceVisibility: "hidden",
            visibility: "visible",
          });
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
          },
        });

        sections.forEach((section, i) => {
          if (i === 0) return;

          const prevSection = sections[i - 1];
          const timeStart = i - 1;

          tl.to(
            section,
            {
              yPercent: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            timeStart
          ).to(
            prevSection,
            {
              yPercent: -100,
              opacity: 0.142,
              duration: 0.6,
              ease: "power1.out",
            },
            timeStart + 0.2
          );
        });

        const steps = sections.length - 1;
        const vh = window.visualViewport?.height ?? window.innerHeight;
        const distancePx = Math.round(steps * vh * 1.8);

        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${distancePx}`,
          pin: container,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
          // snap: {
          //   snapTo: (value) => {
          //     const n = steps;
          //     return Math.round(value * n) / n;
          //   },
          //   duration: 0.01,
          //   ease: "power1.inOut",
          // },
          onRefresh: () => {
            const h = window.visualViewport
              ? window.visualViewport.height
              : window.innerHeight;
            document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
          },
        });

        return () => st.kill();
      });

      // Improved refresh handling
      const refreshHandler = () => {
        setVh();
        ScrollTrigger.refresh();
      };

      // Debounce resize events
      let resizeTimeout: NodeJS.Timeout;
      const debouncedRefresh = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(refreshHandler, 100);
      };

      window.addEventListener("resize", debouncedRefresh);
      window.addEventListener("orientationchange", refreshHandler);
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", debouncedRefresh);
      }

      // Initial refresh
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => {
        mm.revert();
        clearTimeout(resizeTimeout);
        window.removeEventListener("resize", debouncedRefresh);
        window.removeEventListener("orientationchange", refreshHandler);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener("resize", debouncedRefresh);
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.homeServicesWrapper}>
      {/* Fixed title that stays visible */}
      <div className={classes.servicesFixedHeading} ref={headingRef}>
        <h2 className={classes.homeServicesHeading}>SERVICES</h2>
      </div>

      {/* Overlay stack */}
      <div className={classes.homeServices} ref={containerRef}>
        {homeServicesData.map((service, index) => (
          <div
            key={service.title}
            className={classes.serviceSection}
            ref={(el) => addToRefs(el, index)}
          >
            {/* Desktop layout */}
            <div className={classes.serviceContent}>
              <div className={classes.homeServicesDetails}>
                <div className={classes.homeServicesLeftSection}>
                  <div className={classes.homeServicesImage}>
                    <img src={service.img} alt={`${service.title} service`} />
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
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="#000000"
                    >
                      <path d="M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Mobile layout */}
              <div className={classes.homeServicesDetailsMobile}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>{service.num}</h2>
                <h2 className={classes.investmentHeading}>{service.title}</h2>
                <p>{service.description}</p>
                <Button type="black" onClick={scrollToContact}>
                  <span>TALK TO US</span>
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="#000000"
                  >
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
