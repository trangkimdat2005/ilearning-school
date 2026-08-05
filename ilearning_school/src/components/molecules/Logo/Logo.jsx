
import classNames from 'classnames/bind';
import logoIlearning from '../../../assets/images/Group.png'
import styles from './Logo.module.scss'; 

const cx = classNames.bind(styles);

export default function Logo() {
  return (
    <div className={cx('header-left')}>
      <img src={logoIlearning} alt="Logo" />
      <p>ilearning<br />School</p>
    </div>
  );
}