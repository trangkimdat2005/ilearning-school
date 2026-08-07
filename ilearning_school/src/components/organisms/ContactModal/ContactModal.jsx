import { useEffect } from 'react';
import classNames from 'classnames/bind';
import ContactForm from '../../molecules/ContactForm';
import styles from './ContactModal.module.scss';

const cx = classNames.bind(styles);

export default function ContactModal({ isOpen, onClose, classroomId}) {

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
      <div className={cx('modal-overlay', 'active')} id="myModal" onClick={onClose}>

        <div className={cx('modal-position')} onClick={(e) => e.stopPropagation()}>

          <button
            className={cx('close-btn')}
            id="closeBtn"
            aria-label="Close"
            onClick={onClose}
          >
            &#10005;
          </button>

          <div className={cx('contact-modal')} id="modalBox">
            <div className={cx('modal-form')}>

              <div className={cx('form-header')}>
                <h2 className={cx('modal-title')}>Thông tin liên hệ</h2>
              </div>

              <ContactForm onClose={onClose} classroomId={classroomId} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
