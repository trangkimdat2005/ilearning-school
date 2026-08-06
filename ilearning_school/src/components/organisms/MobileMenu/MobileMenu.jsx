import { useState, useEffect } from 'react';
import menuIcon from '../../../assets/images/Group 427321692.png';
import classNames from 'classnames/bind';
import styles from './MobileMenu.module.scss';

const cx = classNames.bind(styles);

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeMenu = (e) => {
    if (e) e.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <a href="#mobile-menu" className={cx('header-button')} onClick={openMenu}>
        <img src={menuIcon} alt="Menu" />
      </a>

      <div
        className={cx('menu-overlay', { active: isOpen })}
        onClick={closeMenu}
      ></div>

      <nav className={cx('mobile-menu', { active: isOpen })}>
        <div className={cx('menu-header')}>
          <span className={cx('menu-title')}>Menu</span>
          <button className={cx('close-menu-btn')} onClick={closeMenu}>
            ✕
          </button>
        </div>
        <ul className={cx('menu-list')}>
          <li><a onClick={closeMenu}>Trang chủ</a></li>
          <li onClick={() => scrollToSection('section-courses')}><a onClick={closeMenu}>Khoá học</a></li>
          <li onClick={() => scrollToSection('section-testimonials')}><a onClick={closeMenu}>Góc học viên</a></li>
          <li onClick={() => scrollToSection('section-mentors')}><a onClick={closeMenu}>Giới thiệu</a></li>
          <li onClick={() => scrollToSection('section-blog')}><a onClick={closeMenu}>Blog</a></li>
          <li><a onClick={closeMenu}>SIGN</a></li>
        </ul>
      </nav>
    </>
  );
}
