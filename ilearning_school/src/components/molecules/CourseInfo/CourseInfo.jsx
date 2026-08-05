import Button from '../../atoms/Button';
import classNames from 'classnames/bind';
import styles from './CourseInfo.module.scss';
import arrowIcon from '../../../assets/images/Vector.png';
import { useSelector } from 'react-redux';


const cx = classNames.bind(styles);


export default function CourseInfo({ classroomId, onXemThem }) {
  const classroom = useSelector((state) =>
    state.classroom.list.find((c) => c.id === classroomId)
  );

  if (!classroom) return null;


  const descriptionItems = classroom.course.shortDescription.split('\n').filter(Boolean);

  return (
    <div className={cx('content-3-right-top')}>
      <h4 className={'line-clamp-2'}>{classroom.course.name}</h4>
      <p>{classroom.course.price}</p>
      <ul>
        {descriptionItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Button className={cx('content-3-btn-xemthem')} onClick={onXemThem}>
        <span className={cx('content-3-right-top-button-text')}>Xem thêm</span>
        <img src={arrowIcon} alt="Arrow Icon" />
      </Button>
    </div>
  );
}
