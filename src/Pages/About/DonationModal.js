import React from 'react';
import { Modal } from 'antd';
import QR_code from "../../components/NavBar/QR_code.jpg";
import './DonationModal.css';

const DonationModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Loyihani qo'llab-quvvatlash"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="donation-modal-content">
        <p>QR-kod yoki quyidagi havola orqali loyihamizni qo'llab-quvvatlang!</p>

        <div className="donation-modal-payment">
          <img src={QR_code} alt="Payment QR Code" />
          <div className="donation-modal-links">
            <a
              href="https://my.click.uz/clickp2p/DD2B79E46658AE8F842AD72B13A5BC791B024B5760CB7D6743F63D44A46122A8"
              target="_blank"
              rel="noopener noreferrer"
              className="donation-modal-button"
            >
              Qo'llab quvvatlash
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;