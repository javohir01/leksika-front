import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './DonationBanner.css';
import QR_code from "./QR_code.jpg";

const DonationBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adjustBottom, setAdjustBottom] = useState(false);

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
    <>
      <div
        className="donation-floating-banner"
        style={{ bottom: adjustBottom ? '120px' : '40px' }}
      >
        <p className="donation-text">
          Leksika.uz - notijorat loyihadir. Uni qo'llab-quvvatlash va rivojlantirishga{' '}
          <span
            className="donation-link"
            onClick={() => setIsModalOpen(true)}
          >
            o'z hissangizni qo'shing
          </span>{' '}
          - har bir donat biz uchun muhim!
        </p>
      </div>

      <Modal
        title="Loyihani qo'llab-quvvatlash"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="donation-content">
          <p>QR-kod yoki quyidagi havola orqali loyihamizni qo'llab-quvvatlang!</p>

          <div className="payment-methods">
            <img src={QR_code} alt="Payment QR Code" />
            <div className="payment-links">
              <a
                href="https://my.click.uz/clickp2p/DD2B79E46658AE8F842AD72B13A5BC791B024B5760CB7D6743F63D44A46122A8"
                target="_blank"
                rel="noopener noreferrer"
                className="payment-button"
              >
                Qo'llab quvvatlash
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DonationBanner;
