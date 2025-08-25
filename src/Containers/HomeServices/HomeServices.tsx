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
  description: string;
  img: string;
  // optional: per-section background if you ever want different colors
  // bg?: string;
};

const HomeServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const homeServicesData: Service[] = [
    { num: "01", title: "REAL ESTATE", description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.", img: serviceImg1 },
    { num: "02", title: "INVESTMENT", description: "Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele. Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.", img: serviceImg2 },
    { num: "03", title: "INFRASTRUCTURE", description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.", img: serviceImg3 },
    { num: "04", title: "ADVISORY", description: "Choose more than a building, choose a home that reflects your personal standard. Live in a space that values distinction, where every detail is held to a high measure. Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.", img: serviceImg4 },
  ];

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!container || sections.length === 0) return;

    // ---- REAL visible viewport for mobile (fixes cut-off) ----
    const setVh = () => {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
    };
    setVh();
    window.visualViewport?.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // Clean reset
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf(sections);

    // Shared cover→push TL (mirrors on reverse; no early reveal)
    const buildTimeline = () => {
      const EPS = 0.0001;
      const ZTOP = 2147483647;   // huge while pinned
      const COVER_AT = 0.00;     // incoming starts immediately (you SEE cover)
      const PUSH_AT  = 0.22;     // outgoing starts later (cover first)
      const COVER_DUR = 0.68;    // incoming ends before step end
      const PUSH_DUR  = 1 - PUSH_AT; // outgoing ends exactly at step end

      sections.forEach((sec, i) => {
        gsap.set(sec, {
          position: 'absolute',
          inset: 0,
          yPercent: i === 0 ? 0 : 100,
          zIndex: i + 1,
          willChange: 'transform',
          force3D: true,
          boxSizing: 'border-box'
        });
      });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      for (let i = 1; i < sections.length; i++) {
        const incoming = sections[i];
        const outgoing = sections[i - 1];
        const t0 = i - 1;

        // Forward: incoming on top
        tl.set(incoming, { zIndex: ZTOP }, t0 - EPS);

        // COVER (incoming 100% -> 0%)
        tl.to(incoming, { yPercent: 0, duration: COVER_DUR }, t0 + COVER_AT);

        // PUSH (outgoing 0% -> -100%)
        tl.to(outgoing, { yPercent: -100, duration: PUSH_DUR }, t0 + PUSH_AT);

        // Reverse: only at the very end of the step, let outgoing get on top
        // so reverse looks identical without "early" reveal.
        tl.set(outgoing, { zIndex: ZTOP }, t0 + 1 - EPS);
      }

      return tl;
    };

    const steps = sections.length - 1;

    // Decouple desktop/mobile with independent distances
    ScrollTrigger.matchMedia({
      "(min-width: 769px)": () => {
        const STEP_VH_DESKTOP = 360; // bigger = slower
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${steps * STEP_VH_DESKTOP}vh`,
          pin: true,
          pinReparent: true,    // pinned above everything (fixes overlay bleed)
          pinSpacing: true,     // keep spacer so following content stays put
          scrub: true,          // stops when you stop
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
          onToggle: (s) => gsap.set(container, { zIndex: s.isActive ? 2147483647 : 1 })
        });
        return () => st.kill();
      },

      "(max-width: 768px)": () => {
        const MOBILE_STEP_MULT = 7.5; // “viewport heights per handoff” (bigger = slower)
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${Math.round(steps * (window.visualViewport ? window.visualViewport.height : window.innerHeight) * MOBILE_STEP_MULT)}px`,
          pin: true,
          pinReparent: true,    // above everything on mobile too
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
          onToggle: (s) => gsap.set(container, { zIndex: s.isActive ? 2147483647 : 1 })
        });
        return () => st.kill();
      }
    });

    // Keep --vh accurate & refresh ST on changes that affect visual height
    const refreshAll = () => { setVh(); ScrollTrigger.refresh(); };
    requestAnimationFrame(refreshAll);
    window.addEventListener('resize', refreshAll);
    window.addEventListener('orientationchange', refreshAll);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', refreshAll);
    const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach(img => { if (!img.complete) img.addEventListener('load', refreshAll, { once: true }); });

    return () => {
      window.removeEventListener('resize', refreshAll);
      window.removeEventListener('orientationchange', refreshAll);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', refreshAll);
    };
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div className={classes.homeServicesWrapper}>
      {/* sticky title that stays visible the whole time */}
      <div className={classes.servicesFixedHeading}>
        <h2 className={classes.homeServicesHeading}>SERVICES</h2>
      </div>

      {/* overlay stack */}
      <div className={classes.homeServices} ref={containerRef}>
        {homeServicesData.map((service, index) => (
          <div
            key={service.title}
            className={classes.serviceSection}
            ref={(el) => addToRefs(el, index)}
            // style={{ background: service.bg ?? '#000' }}
          >
            {/* desktop layout */}
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
                  <Button type='black'>
                    <span>TALK TO US</span>
                    <svg width='16' height='14' viewBox='0 0 16 14' fill='#000000'>
                      <path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* mobile layout (no animation) */}
              <div className={classes.homeServicesDetailsMobile}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
                <h2 className={classes.numberHeading}>{service.num}</h2>
                <h2 className={classes.investmentHeading}>{service.title}</h2>
                <p>{service.description}</p>
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