import classNames from 'classnames/bind';
import Button from '../../atoms/Button';
import styles from './Navigation.module.scss';
import arrowDownIcon from '../../../assets/images/Vector (1).png';

const cx = classNames.bind(styles);

const scrollToSection = (sectionId) => {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Navigation() {
  return (
    <ul className={cx('header-right')}>
      <li><a>Trang chủ</a></li>
      <li >
        <a >
          <div onClick={() => scrollToSection('section-courses')}>
            Khoá học
            <img src={arrowDownIcon} alt="Arrow Down" className={cx('dropdown-icon')} />
          </div>
        </a>
      </li>
      <li onClick={() => scrollToSection('section-testimonials')}><a>Góc học viên</a></li>
      <li onClick={() => scrollToSection('section-mentors')} ><a>Giới thiệu</a></li>
      <li onClick={() => scrollToSection('section-blog')}><a>Blog</a></li>

      <div className={cx('header-right-icon')}></div>

      {/* Auth Actions
      <li className="login-text">Log In</li> */}
      <li>
        <Button className={cx('nav-btn')}>SIGN</Button>
      </li>
    </ul>
  );
}
