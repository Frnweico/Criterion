import classes from './HomeServices.module.css';
import Button from '../../Components/Button/Button';
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png";
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png";
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png";
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png";
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  num: string;
  title: string;
  description1: string;
  description2: string;
  img: string;
};

const HomeServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const homeServicesData: Service[] = [
    { num: "01", title: "REAL ESTATE", description1: "Choose more than a building, choose a home that reflects your personal standard.", description2: "Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.", img: serviceImg1 },
    { num: "02", title: "INVESTMENT", description1: "Your investments should reflect the same standards you apply to the rest of your life.",description2: "Choose investment opportunities guided by a principle of value that goes beyond profit; delivering returns that are financially sound, future-proof, and worthy of your portfolio.", img: serviceImg2 },
    { num: "03", title: "INFRASTRUCTURE", description1: "Great living isn’t just about where you are. It’s about how everything around you supports it.", description2: "Let every detail work in harmony with the life you lead. Choose infrastructure that quietly shapes environments to elevate everyday living.", img: serviceImg3 },
    { num: "04", title: "ADVISORY", description1: "When your choices carry weight, your counsel should too.Get private, tailored advisory services that help you navigate property, investments, and landmark projects with clarity and confidence. ", description2: "Every recommendation reflects an understanding of your priorities, guided by a measure that doesn’t entertain anything but the standard.", img: serviceImg4 },
  ];

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = sectionsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!container || sections.length === 0) return;
      
      const setVh = () => {
        const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
      };
      setVh();
      
      // Clean reset
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(sections);
      
      // build animation - ensure no black screens
      const buildTimeline = () => {
        const ZTOP = 2147483647;   
        
        // Initialize all sections properly
        sections.forEach((sec, i) => {
          gsap.set(sec, {
            position: 'absolute',
            inset: 0,
            yPercent: i === 0 ? 0 : 100,
            zIndex: i === 0 ? ZTOP : 1,  
            willChange: 'transform',
            force3D: true,
            boxSizing: 'border-box',
            backfaceVisibility: 'hidden'
          });
        });

        const tl = gsap.timeline({ defaults: { ease: 'none' } });

        for (let i = 1; i < sections.length; i++) {
          const incoming = sections[i];
          const outgoing = sections[i - 1];
          const t0 = i - 1;

          // Keep outgoing visible throughout
          tl.set(outgoing, { zIndex: ZTOP - 1, yPercent: 0 }, t0);
          tl.set(incoming, { zIndex: ZTOP, yPercent: 100 }, t0);
          
          // Incoming slides up covering outgoing
          tl.to(incoming, { yPercent: 0, duration: 0.6 }, t0 + 0.2);
          
          // Then push outgoing up
          tl.to(outgoing, { yPercent: -100, duration: 0.4 }, t0 + 0.6);
          
          // Clean up z-index
          tl.set(outgoing, { zIndex: 1 }, t0 + 1);
        }

        return tl;
      };

      const steps = sections.length - 1;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const STEP_VH_DESKTOP = 120; // Slower scroll on desktop
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${steps * STEP_VH_DESKTOP}vh`,
           pin: container,                
    pinSpacing: true,              
    pinReparent: false,           
    scrub: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: tl,
    onRefresh: () => {

      sections.forEach((sec, i) => {
        gsap.set(sec, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i === 0 ? 2147483647 : 1,
          backfaceVisibility: 'hidden'
        });
      });
    }
      });
      
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => st.kill();
});

      mm.add("(max-width: 768px)", () => {
        const MOBILE_STEP_MULT = 1.2;
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${Math.round(steps * (window.visualViewport ? window.visualViewport.height : window.innerHeight) * MOBILE_STEP_MULT)}px`,
          pin: true,
          pinReparent: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
        });
        return () => st.kill();
      });

      const refreshAll = () => { setVh(); ScrollTrigger.refresh(); };
      requestAnimationFrame(refreshAll);

      window.addEventListener('resize', refreshAll);
      window.addEventListener('orientationchange', refreshAll);
      if (window.visualViewport) window.visualViewport.addEventListener('resize', refreshAll);

      return () => {
        mm.revert();
        window.removeEventListener('resize', refreshAll);
        window.removeEventListener('orientationchange', refreshAll);
        if (window.visualViewport) window.visualViewport.removeEventListener('resize', refreshAll);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={classes.homeServicesWrapper}>
      {/* Fixed title that stays visible */}
      <div className={classes.servicesFixedHeading}>
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
                  <p>{service.description1}</p>
                  <p>{service.description2}</p>
                  <Button type='black'>
                    <span>TALK TO US</span>
                    <svg width='16' height='14' viewBox='0 0 16 14' fill='#000000'>
                      <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Mobile layout */}
              <div className={classes.homeServicesDetailsMobile}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>{service.num}</h2>
                <h2 className={classes.investmentHeading}>{service.title}</h2>
                <p>{service.description1}</p>
                <p>{service.description2}</p>
                <Button type='black'>
                  <span>TALK TO US</span>
                  <svg width='16' height='14' viewBox='0 0 16 14' fill='#000000'>
                    <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
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