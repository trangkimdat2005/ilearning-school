import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss'; 

const cx = classNames.bind(styles);

export default function SearchBar() {
  return (
    <div className={cx('header-center')}>
      <a href="#search">
        <div className={cx('header-search')}>
          <img src="src/assets/images/search-normal.png" alt="Search Icon" />
        </div>
      </a>
      <input 
        type="text" 
        id="share" 
        placeholder="Tìm kiếm khoá học, bài viết, video..." 
        autoComplete="off" 
      />
    </div>
  );
}
