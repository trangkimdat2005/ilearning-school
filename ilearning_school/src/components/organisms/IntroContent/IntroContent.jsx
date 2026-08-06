
import classNames from 'classnames/bind';
import styles from './IntroContent.module.scss';

const cx = classNames.bind(styles);

export default function IntroContent() {
  return (
    <div className={cx('content-2')}>
      <h4>
        Bạn đã tự tin để trở thành Senior Software Engineer?
      </h4>
      <p>
        Ngành IT đang ngày càng phát triển và thay đổi nhanh chóng. Từ đó, chất lượng các kỹ sư cũng ngày càng
        được yêu cầu khắt khe hơn. Chúng tôi thấu hiểu những khó khăn trên con đường trở thành Senior Software
        Engineer và tự tin giúp bạn có thể thực hiện được điều đó.
      </p>
    </div>
  );
}
