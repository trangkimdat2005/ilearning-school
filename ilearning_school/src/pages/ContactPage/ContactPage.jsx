import ContactForm from "../../components/molecules/ContactForm/ContactForm";
import classNames from 'classnames/bind';
import styles from './ContactPage.module.scss';

const cx = classNames.bind(styles);

export default function ContactPage() {
  return (
    <div className={cx('mobile-contact-page')}>
      <div className={cx('modal-form')}>
        <div className={cx('form-header')}>
          <h2 className={cx('modal-title')}>Thông tin liên hệ</h2>
        </div>
        
        <ContactForm />
        
      </div>
    </div>
  );
}