import classes from './HomeServices.module.css';
import Button from '../../Components/Button/Button';
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png"
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png"
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png"
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png"
import {useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register plugins
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

const HomeServices = () => {
  const { scrollToRef } = useContext(AppContext);
    const containerRef = useRef<HTMLDivElement>(null);
    // const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);


    const homeServicesData = [
        {
            num: "01",
            title: "REAL ESTATE",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg1
        },
        {
            num: "02",
            title: "INVESTMENT",
            description: "Criterion Homes offers private, high-yield real estate investment opportunities reserved for a select clientele. Our projects are built on verified legal compliance, future-proof designs, and strategic locations that deliver both financial returns and long-term value preservation.",
            img: serviceImg2
        },
        {
            num: "03",
            title: "INFRASTRUCTURE",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg3
        },
        {
            num: "04",
            title: "ADVISORY",
            description: "Choose more than a building, choose a home that reflects your personal standard.Live in a space that values distinction, where every detail is held to a high measure.Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg4
        },
    ]

 useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(`.${classes.serviceSection}`);
    if (!sections.length) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ENTER_START = isMobile ? 'top 92%' : 'top 85%'; // when next starts appearing
    const ENTER_END   = isMobile ? 'top 58%' : 'top 40%'; // when it fully takes over

    // base states: nothing overlaps visibly at load
    gsap.set(sections, { opacity: 0, yPercent: 6, zIndex: 1 });
    gsap.set(sections[0], { opacity: 1, yPercent: 0, zIndex: 2 });
    sections[0].classList.add(classes.active);

    sections.forEach((section, i) => {
      // bring current section IN (scroll-scrubbed)
      gsap.fromTo(
        section,
        { opacity: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 6 },
        {
          opacity: 1,
          yPercent: 0,
          ease: 'none',            // keep it tied to scroll
          scrollTrigger: {
            trigger: section,
            start: i === 0 ? 'top top+=1' : ENTER_START,
            end: ENTER_END,
            scrub: true,
            onEnter: () => {
              sections.forEach(s => s.classList.remove(classes.active));
              section.classList.add(classes.active);
              gsap.set(sections, { zIndex: 1 });
              gsap.set(section, { zIndex: 2 }); // keep current above the rest
            },
            onEnterBack: () => {
              sections.forEach(s => s.classList.remove(classes.active));
              section.classList.add(classes.active);
              gsap.set(sections, { zIndex: 1 });
              gsap.set(section, { zIndex: 2 });
            }
          }
        }
      );

      // push the PREVIOUS section OUT as this one comes in
      if (i > 0) {
        const prev = sections[i - 1];
        gsap.to(prev, {
          opacity: 0,
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: ENTER_START,
            end: ENTER_END,
            scrub: true
          }
        });
      }

      // optional: content bits pop a touch as the section becomes active
      const bits = [
        section.querySelector(`.${classes.homeServicesHeading}`),
        section.querySelector(`.${classes.numberHeading}`),
        section.querySelector(`.${classes.investmentHeading}`),
        section.querySelector('p'),
        section.querySelector('button'),
        section.querySelector(`.${classes.homeServicesImage}`)
      ].filter(Boolean) as HTMLElement[];

      if (bits.length) {
        gsap.from(bits, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: ENTER_START,
            toggleActions: 'play none none reverse'
          }
        });
      }
    });

    // refresh once images are loaded (prevents mobile jump/overlap)
    const imgs = Array.from(containerRef.current!.querySelectorAll('img'));
    let pending = imgs.length;
    if (pending === 0) ScrollTrigger.refresh();
    imgs.forEach(img => {
      if (img.complete) {
        if (--pending === 0) ScrollTrigger.refresh();
      } else {
        img.addEventListener('load', () => { if (--pending === 0) ScrollTrigger.refresh(); }, { once: true });
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: containerRef });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={classes.homeServices} ref={containerRef}>
            {homeServicesData.map((service, index) => (
                <div 
                    key={index}
          className={`${classes.serviceSection}`}
                >
                    {/* Desktop Layout */}
                     <div className={classes.serviceContent}>
                    <div className={classes.homeServicesDetails}>
                        <div className={classes.homeServicesLeftSection}>
                            <h2 className={classes.homeServicesHeading}>SERVICES</h2>
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

                    {/* Mobile Layout */}
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
    );
}

export default HomeServices