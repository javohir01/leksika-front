import React, { useState } from 'react';
import { Modal } from 'antd';
import './DonationBanner.css';
import QR_code from "./QR_code.png";

const DonationBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="donation-banner">
        <p>
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
      >
        <div className="donation-content">
          <p>Qr code orqali yoki quyidagi linkni bosish orqali loyihamizni qo'llab-quvvatlang!</p>
          
          <div className="payment-methods">
            <img src={QR_code} alt="Payment QR Code" />
            <div className="payment-links">
              <a href="#" className="payment-button">Click</a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DonationBanner;