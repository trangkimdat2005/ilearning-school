import { useEffect } from 'react';
import ContactForm from '../../molecules/ContactForm';

export default function ContactModal({ isOpen, onClose }) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="contact-module">
      <div className="modal-overlay active" id="myModal" onClick={onClose}>
        
        <div className="modal-position" onClick={(e) => e.stopPropagation()}>
          
          <button 
            className="close-btn" 
            id="closeBtn" 
            aria-label="Close" 
            onClick={onClose}
          >
            &#10005;
          </button>
          
          <div className="contact-modal" id="modalBox">
            <div className="modal-form">
              
              <div className="form-header">
                <h2 className="modal-title">Thông tin liên hệ</h2>
              </div>

              <div className="form-body">
                <ContactForm />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
