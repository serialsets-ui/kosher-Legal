import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="f-brand-name">Kosher Legal</span>
          <span className="f-tagline">Ethics · Compliance · Justice</span>
          <p className="f-about">A forward-thinking law firm grounded in ethical practice, transparency, and compliance — serving individuals, businesses, and organizations across Nigeria with clarity and precision.</p>
          <div className="socials">
            <a href="#" className="social-btn">📷 Instagram</a>
            <a href="#" className="social-btn">💼 LinkedIn</a>
            <a href="#" className="social-btn">📘 Facebook</a>
            <a href="#" className="social-btn">𝕏 Twitter</a>
          </div>
        </div>
        <div>
          <div className="f-col-title">Services</div>
          <ul className="f-links">
            <li><Link to="/services">Corporate &amp; Commercial Law</Link></li>
            <li><Link to="/services">Regulatory Compliance</Link></li>
            <li><Link to="/services">Dispute Resolution (ADR)</Link></li>
            <li><Link to="/services">Business Ethics Training</Link></li>
            <li><Link to="/services">Property Law</Link></li>
          </ul>
        </div>
        <div>
          <div className="f-col-title">Company</div>
          <ul className="f-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/programs">Signature Programs</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/intake">Client Intake</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="f-col-title">Contact</div>
          <ul className="f-links">
            <li><a href="tel:+2349137189724">+234 913 718 9724</a></li>
            <li><a href="mailto:kosherlegal1@gmail.com">kosherlegal1@gmail.com</a></li>
            <li><a href="#">Ajah, Lagos, Nigeria</a></li>
            <li><a href="https://wa.me/2349137189724" target="_blank" rel="noopener">WhatsApp Chat</a></li>
            <li><a href="https://kosherlegal.com.ng" target="_blank" rel="noopener">kosherlegal.com.ng</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bot">
        <span className="f-copy">© 2025 Kosher Legal. All rights reserved. Km 23 Richard Mall, Beside Lagos Business School, Ajah, Lagos.</span>
        <div className="f-policy">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
