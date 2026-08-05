import classNames from 'classnames/bind';
import styles from './ContactForm.module.scss'; 

const cx = classNames.bind(styles);


export default function ContactForm() {
  return (
    <div className={cx('form-body')}>
      <form action="#" method="POST">
        <div className={cx('form-row')}>
          <div className={cx('form-group')}>
            <label htmlFor="companyName">Tên Công Ty</label>
            <input type="text" id="companyName" placeholder="Nhập tên Công Ty" />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="fullName">Họ và Tên</label>
            <input type="text" id="fullName" placeholder="Họ và Tên" />
          </div>
        </div>

        <div className={cx('form-row')}>
          <div className={cx('form-group')}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="abc@gmail.com" />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="phone">Số điện thoại</label>
            <input type="text" id="phone" placeholder="Nhập số điện thoại" />
          </div>
        </div>

        <div className={cx('form-group','full-width')}>
          <label htmlFor="message">Vui lòng tư vấn cho tôi</label>
          <textarea id="message" placeholder="Vui lòng nhập lời nhắn"></textarea>
        </div>

        <div className={cx('form-submit')}>
          <button type="submit" className={cx('submit-btn')}>Gửi</button>
        </div>
      </form>
    </div>
  );
}
