import classNames from 'classnames/bind';
import styles from './SectionHeader.module.scss';

const cx = classNames.bind(styles);

export default function SectionHeader({ topText, bottomText, className='' }) {
  return (
    <div className={cx('content-text', className)}>
      {topText}
      <br />
      <b>{bottomText}</b>
    </div>
  );
}
