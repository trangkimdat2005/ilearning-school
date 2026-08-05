import classNames from 'classnames/bind';
import styles from './BannerSlide.module.scss';
import Button from '../../atoms/Button';
import { getFileUrl } from '../../../utils/fileUrl';

const cx = classNames.bind(styles);

export default function BannerSlide({ isActive, bgUrl, title, description, onOpenModal, buttonText }) {

  return (
    <div className={`carousel-item ${isActive ? 'active' : ''}`}>
      <div className={cx('content-img-slide')}>
        <img
          src={getFileUrl(bgUrl)}
          alt={title || "Banner"}
          className={cx('bg-image')}
        />

        <div className={cx('overlay')}></div>

        <div className={cx('content-img-center')}>
          <div className={cx('content-img-center-text')}>
            <h1 className='line-clamp-2'>{title}</h1>
            <p>{description}</p>
          </div>
          <Button onClick={onOpenModal}>Đăng ký ngay</Button>
        </div>

      </div>
    </div>
  );
}