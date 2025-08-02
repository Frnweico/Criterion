import { useContext, useEffect, useState } from "react";
import classes from "./HomeContact.module.css";
import { AppContext } from "../../Context/AppContext";

const HomeContact = () => {
      const { contactRef } = useContext(AppContext);
  return (
    <section className={classes.homeContact} ref={contactRef}>
      <h2  data-aos="zoom-in-up" data-aos-duration="1200">TALK TO US</h2>
      <div className={classes.homeContactDetails}
      data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1000">
        <div className={classes.homeContactDetailsText}
        data-aos="fade-right"
          data-aos-delay="300">
          <p>
            Have a question? <br />
            An investment idea? <br />
            Or something you want to build?
          </p>
        <p>We'd love to hear from you</p>
        </div>
        <div data-aos="fade-left" data-aos-delay="400">
          <a href="https://wa.me/+2348058573915" target="_blank">Send us a Whatsapp Message</a>
          <a href="mailto:info@criterionhomesltd.com" target="_blank">Send us an email</a>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
