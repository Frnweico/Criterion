import classes from "./PropertyPage.module.css";
import line from "../../Assets/Images/Line 8.svg";
import Button from "../../Components/Button/Button";
import { WhatsApp } from '@mui/icons-material';
import phone from "../../Assets/Images/Phone Call Streamline Feather1.svg";
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';

const PropertyPricing = () => {
  useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

    const rows = [
    {
      milestone: 'Foundation',
      payment: '20% – 1st Instalment\n₦55,000,000',
      timeline: 'After 8 Weeks of starting',
    },
    {
      milestone: '1st Floor Slab',
      payment: '20% – 2nd Instalment\n₦55,000,000',
      timeline: 'After 8 Weeks',
    },
    {
      milestone: '2nd Floor Slab',
      payment: '20% – 3rd Instalment\n₦55,000,000',
      timeline: 'After 8 Weeks',
    },
    {
      milestone: 'Roofing and Plastering',
      payment: '20% – 4th Instalment\n₦55,000,000',
      timeline: 'After 8 Weeks',
    },
    {
      milestone: 'Finishes and Painting',
      payment: '20% – 5th Instalment\n₦55,000,000',
      timeline: 'After 8 Weeks',
    },
  ];

  return (
    <div>
    <div data-aos="fade-up" className={classes.propertyPricing}>
      <h2>
        Pricing & Payment Plan
      </h2>
      <div className={classes.propertyPricingContent}>
        <img src={line} alt="a line" />
        <div className={classes.propertyTableWrapper}>
      <table className={classes.pricingTable}>
        <thead>
          <tr>
            <th>MILESTONE</th>
            <th>PAYMENT</th>
            <th>TIMELINE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {row.milestone.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </td>
              <td>{row.payment}</td>
              <td>{row.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <div className={classes.staticRow}>
            <div>
              <p>Project Completion</p>
              <p className={classes.staticRowText}>10th Month</p>
            </div>
            <div>
              <p>Project Handover</p>
              <p className={classes.staticRowText}>12th Month</p>
            </div>
          </div>


    </div>
      </div>
    </div>
    <div className={classes.propertyPricingContact}>
        <div className={classes.propertyPricingContactText}>
            <h3>CRITERION <br /> HOMES' CONTACT</h3>
            <div> <WhatsApp style={{fontSize: '16px'}} /> <img src={phone} alt="phone icon" /><span>+234 805 857 3915</span></div>
        </div>
        <a href="https://wa.me/2348058573915" target='_blank' rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <Button type="footerBtn"> <span>TALK TO US</span>
        <svg
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='#fff'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8.86307 0.119629L7.58108 1.3905L12.4858 6.1107H0V7.89481H12.4798L7.58108 12.6092L8.86307 13.8801L16 7L8.86307 0.119629Z' /></svg>
                        </Button></a>
    </div>
    </div>
  )
}

export default PropertyPricing
