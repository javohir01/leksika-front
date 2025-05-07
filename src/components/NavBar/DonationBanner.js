import React, { useState, useEffect, useRef } from 'react';
import './DonationBanner.css';
import QR_code from "./QR_code.jpg";

const DonationBanner = () => {
  const [adjustBottom, setAdjustBottom] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAdjustBottom(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bannerRef}
      className="floating-donation"
      style={{ bottom: adjustBottom ? '120px' : '30px' }}
    >
      <div className="donation-box">
        <p>Biz bilan bilim ulashing — hissa qo‘shing:</p>
        <img src={QR_code} alt="QR Code" />
        <a 
          href="https://my.click.uz/clickp2p/DD2B79E46658AE8F842AD72B13A5BC791B024B5760CB7D6743F63D44A46122A8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button"
        >
          Donat qilish
        </a>
      </div>
    </div>
  );
};

export default DonationBanner;
