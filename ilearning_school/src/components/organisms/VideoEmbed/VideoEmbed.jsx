
import classNames from 'classnames/bind';
import styles from './VideoEmbed.module.scss';

const cx = classNames.bind(styles);

export default function VideoEmbed({ 
  embedUrl = "https://www.youtube.com/embed/N536pWbWGRk", 
  title = "YouTube video player" 
}) {
  return (
    <div className={cx('content-video')}>
      <iframe 
        src={embedUrl} 
        title={title} 
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
