import React from 'react';

export default function ContactFooter({ text }) {
  return (
    <footer className="contact-footer" id="contact">
      <div className="contact-footer__content">
        <div className="contact-footer__topline reveal">
          <p>{text.closing.overline}</p>
          <div className="contact-footer__wordmark" aria-label="Zayn">ZAYN</div>
        </div>
        <h2 className="reveal"><span>{text.closing.title1}</span><strong>{text.closing.title2}</strong></h2>
        <a className="contact-footer__email reveal" href={`mailto:${text.contact.email}`}>
          <span>{text.closing.action}</span><strong>{text.contact.email}</strong><b aria-hidden="true">↗</b>
        </a>
      </div>
      <div className="contact-footer__bottom">
        <span>© 2026 ZAYN HUANG</span>
        <a href="tel:+8613208312346">{text.contact.phone}</a>
        <a href="#top" aria-label="Back to top">↑</a>
      </div>
    </footer>
  );
}
