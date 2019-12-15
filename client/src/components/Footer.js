import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer className="footer" role="contentinfo">
    {/* <div className="footer-img">
      <img src={process.env.PUBLIC_URL + "/images/footer-img.png"} className="img-responsive" alt="footerimg" />
    </div> */}
    <div className="flex-row footer-wrapper">
      <div className="flex-col-4">
        <h3>Company</h3>
        <ul className="footer-link-wrapper">
          <li><a href="/" className="footer-link">About us</a></li>
          <li><a href="/services" className="footer-link">Our services</a></li>
          <li><a href="/contact" className="footer-link">Contacts</a></li>
          <li><a href="#help" className="footer-link">Help</a></li>
        </ul>
      </div>
      <div className="flex-col-4">
        <h3>Contact</h3>
        <ul className="footer-link-wrapper">
          <li><a href="mailto:someone@example.com" className="footer-link">someone@example.com</a></li>
          <li><a href="tel:+38006244578" rel="nofollow" className="footer-link">+3-800-624-4578</a></li>
        </ul>
        <ul className="icon-wrapper">
          <li><a href="/" className="icon-link icon-link-facebook" target="_blank" title="Follow on Facebook">Facebook</a></li>
          <li><a href="/" className="icon-link icon-link-twitter" target="_blank" title="Follow on Twitter">Twitter</a></li>
          <li><a href="/" className="icon-link icon-link-pinterest" target="_blank" title="Follow on Pinterest">Pinterest</a></li>
          <li><a href="/" className="icon-link icon-link-google" target="_blank" title="Follow on Google Plus">Google Plus</a></li>
        </ul>
      </div>
      <div className="flex-col-4">
        <h3>Adress</h3>
        <p className="footer-adress">
          101 The Amazing Road <br />
          Privier Building <br />
          Manhattan<br />
          400105
        </p>
      </div>
    </div>
    <div className="copyright">
      <p>Copyright 2017 Criflan Design Inc. All Rights Reserved</p>
    </div>
  </footer>
);

export default Footer;