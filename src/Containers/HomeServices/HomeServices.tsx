import classes from './HomeServices.module.css';
import Button from '../../Components/Button/Button';
import serviceImg1 from "../../Assets/Images/Services 1 - Image.png"
import serviceImg2 from "../../Assets/Images/Services 2 - Image.png"
import serviceImg3 from "../../Assets/Images/Services 3 - Image.png"
import serviceImg4 from "../../Assets/Images/Services 4 - Image.png"
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomeServices = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
    const servicesHeadingRef = useRef<HTMLHeadingElement>(null);

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
            description: "Choose more than a building, choose a home that reflects your personal standard. Live in a space that values distinction, where every detail is held to a high measure. Prioritise lasting worth, quiet elegance, and a seamless fit with the way you live.",
            img: serviceImg4
        },
    ];

    useEffect(() => {
        if (!containerRef.current) return;
        
        const sections = sectionsRef.current.filter(Boolean) as HTMLDivElement[];
        if (sections.length === 0) return;
        
        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;
        
        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Don't apply GSAP animations on mobile
        if (isMobile) {
            gsap.set(sections, { clearProps: "all" });
            return;
        }
        
        // Set initial state - all sections start at proper positions
        gsap.set(sections, { 
            y: 0,
            zIndex: (i) => sections.length - i
        });
        
        // Position all sections except the first one below the viewport initially
        sections.forEach((section, i) => {
            if (i > 0) {
                gsap.set(section, { 
                    y: "100vh"
                });
            }
        });
        
        // Calculate total scroll height properly
        const totalScrollHeight = (sections.length - 1) * 100; // 100vh per transition
        
        // Create individual ScrollTriggers for each section transition
        sections.forEach((section, i) => {
            if (i === 0) return; // Skip first section
            
            const startProgress = (i - 1) / (sections.length - 1);
            const endProgress = i / (sections.length - 1);
            
            gsap.to(section, {
                y: 0,
                ease: "power2.inOut", // Smoother easing
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: `${startProgress * totalScrollHeight}vh top`,
                    end: `${endProgress * totalScrollHeight}vh top`,
                    scrub: 1.5, // Smooth scrub
                    pin: false,
                    onUpdate: (self) => {
                        const prevSection = sections[i - 1];
                        const progress = self.progress;
                        gsap.set(prevSection, {
                            y: -progress * 100 + "vh"
                        });
                    }
                }
            });
        });
        
        // Pin the container with exact calculations
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalScrollHeight}vh`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onRefresh: () => {
                // Ensure no white space
                ScrollTrigger.refresh(true);
            }
        });
        
        // Handle window resize
        const handleResize = () => {
            const isNowMobile = window.innerWidth <= 768;
            if (isNowMobile) {
                gsap.set(sections, { clearProps: "all" });
            }
            ScrollTrigger.refresh();
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Add sections to ref array
    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        sectionsRef.current[index] = el;
    };

    return (
        <div className={classes.homeServicesWrapper}>
            {/* Fixed Services Heading - Outside scroll container */}
            <div className={classes.servicesFixedHeading}>
                <h2 className={classes.homeServicesHeading}>SERVICES</h2>
            </div>
            
            {/* Scrolling container */}
            <div className={classes.homeServices} ref={containerRef}>
                {homeServicesData.map((service, index) => (
                    <div 
                        key={index}
                        className={`${classes.serviceSection}`} 
                        ref={el => addToRefs(el, index)}
                    >
                        {/* Desktop Layout */}
                        <div className={classes.serviceContent}>
                            <div className={classes.homeServicesDetails}>
                                <div className={classes.homeServicesLeftSection}>
                                    {/* Image only - heading is now fixed outside */}
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

                            {/* Mobile Layout - FLEX COLUMN */}
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
}

export default HomeServices;