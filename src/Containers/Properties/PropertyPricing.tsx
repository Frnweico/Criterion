import classes from "./PropertyPage.module.css";
import line from "../../Assets/Images/Line 8.svg";
import Button from "../../Components/Button/Button";
import { WhatsApp } from '@mui/icons-material';
import phone from "../../Assets/Images/Phone Call Streamline Feather1.svg";
const PropertyPricing = () => {
    const rows = [
    {
      payment: '20% – 1st Instalment\n₦55,000,000',
      milestone: 'Foundation',
      timeline: 'After 8 Weeks of starting',
    },
    {
      payment: '20% – 2nd Instalment\n₦55,000,000',
      milestone: '1st Floor Slab',
      timeline: 'After 8 Weeks',
    },
    {
      payment: '20% – 3rd Instalment\n₦55,000,000',
      milestone: '2nd Floor Slab',
      timeline: 'After 8 Weeks',
    },
    {
      payment: '20% – 4th Instalment\n₦55,000,000',
      milestone: 'Roofing and Plastering',
      timeline: 'After 8 Weeks',
    },
    {
      payment: '20% – 5th Instalment\n₦55,000,000',
      milestone: 'Finishes and Painting',
      timeline: 'After 8 Weeks',
    },
  ];

  return (
    <div>
    <div className={classes.propertyPricing}>
      <h2>
        Pricing & Payment Plan
      </h2>
      <div className={classes.propertyPricingContent}>
        <img src={line} alt="a line" />
        <div className={classes.propertyTableWrapper}>
      <table className={classes.pricingTable}>
        <thead>
          <tr>
            <th>HOUSE TYPE</th>
            <th>PAYMENT</th>
            <th>MILESTONE</th>
            <th>TIMELINE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>4 Bedroom Terrace Duplex</td>
              <td>
                {row.payment.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </td>
              <td>{row.milestone}</td>
              <td>{row.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>

{/* Mobile Split Tables - Just 2 Total Tables */}
<div className={classes.pricingMobileTables}>
  {/* Table 1: HOUSE TYPE and PAYMENT */}
  <table className={classes.mobileTable}>
    <thead>
      <tr>
        <th>HOUSE TYPE</th>
        <th>PAYMENT</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <td>4 Bedroom Terrace Duplex</td>
          <td>
            {row.payment.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Table 2: MILESTONE and TIMELINE */}
  <table className={classes.mobileTable}>
    <thead>
      <tr>
        <th>MILESTONE</th>
        <th>TIMELINE</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <td>{row.milestone}</td>
          <td>{row.timeline}</td>
        </tr>
      ))}
    </tbody>
  </table>
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
