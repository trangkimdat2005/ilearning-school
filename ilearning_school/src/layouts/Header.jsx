import Logo from '../components/molecules/Logo/Logo';
import SearchBar from '../components/molecules/SearchBar/SearchBar';
import Navigation from '../components/molecules/Navigation/Navigation';
import HeaderActions from '../components/molecules/HeaderActions/HeaderActions';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('header-around')}>
        
        {/* Nhóm Logo và SearchBar */}
        <div className={cx('header-left-center')}>
          <Logo />
          <SearchBar />
        </div>

        {/* Menu Điều hướng và Auth */}
        <Navigation />

        {/* Các nút Hỗ trợ / Mobile Menu */}
        <HeaderActions />

      </div>
    </header>
  );
}