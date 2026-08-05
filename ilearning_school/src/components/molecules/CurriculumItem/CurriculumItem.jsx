import { useState } from 'react';
import classNames from 'classnames/bind';
import plusIcon from '../../../assets/images/cong.png';
import minusIcon from '../../../assets/images/tru.png';
import styles from './CurriculumItem.module.scss'; 
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function CurriculumItem({ syllabusId, children }) {


  const syllabus = useSelector((state) =>
    state.syllabus.list.find((s) => (s.id === syllabusId && s.ordering>0))
  );

  if (!syllabus) return null;


  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx('content-3-box-1')}>
      <div className={cx('content-3-box-top')}>
        <p className={`line-clamp-1`}>{syllabus.name}</p>
        <div className={cx('content-3-box-top-right')}>
          <div className={cx('content-3-box-top-session')}>{syllabus.ordering} buổi</div>
          
          <button className={cx('toggle-btn')} onClick={() => setIsOpen(!isOpen)}>
            <img 
              src={isOpen ? minusIcon : plusIcon} 
              alt={isOpen ? "Minus Icon" : "Plus Icon"} 
              className={`icon-toggle ${isOpen ? 'rotate' : ''}`} 
            />
          </button>
        </div>
      </div>
      
      <div className={`${cx('content-3-box-bottom' ,'toggle-box')} ${isOpen ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}
