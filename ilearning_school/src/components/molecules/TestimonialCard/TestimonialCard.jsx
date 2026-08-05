import classNames from 'classnames/bind';
import styles from './TestimonialCard.module.scss'; 
import { getFileUrl } from '../../../utils/fileUrl'

const cx = classNames.bind(styles);

export default function TestimonialCard({ testimonial }) {

  return (
    <div className={cx('content-5-box')}>
      <div className={cx('content-5-box-top')}>
        <h2>"</h2>
        <p >{testimonial.message}</p>
      </div>
      <div className={cx('content-5-box-bottom')}>
        <img src={getFileUrl(testimonial.student?.account?.avatarPath)} alt="Profile Photo" />
        <div className={cx('content-5-box-bottom-right')}>
          <h4>{testimonial.student?.account?.fullName}</h4>
          <p>{testimonial.student?.account?.fullName}</p>
        </div>
      </div>
    </div>
  );
}
