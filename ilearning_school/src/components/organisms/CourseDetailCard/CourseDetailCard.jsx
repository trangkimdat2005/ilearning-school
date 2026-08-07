import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseDetailCard.module.scss';
import CourseInfo from '../../molecules/CourseInfo';
import CurriculumItem from '../../molecules/CurriculumItem';
import { getFileUrl } from '../../../utils/fileUrl'
import ContactModal from '../ContactModal';
import { fetchSyllabusListRequest } from '../../../features/syllabus/syllabusSlice';
import classNames from 'classnames/bind';
import styles from './CourseDetailCard.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function CourseDetailCard({ classroomId }) {


  const classroom = useSelector((state) =>
    state.classroom.list.find((c) => c.id === classroomId)
  );

  if (!classroom) return null;
  const dispatch = useDispatch();
  const { list: syllabusList, loading, error, totalElements, urlBase } = useSelector((state) => state.syllabus);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenContact = (e) => {
    e.preventDefault();

    if (window.innerWidth < 768) {
      navigate('/lien-he');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleXemThem = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDangKy = () => {
    console.log("Đăng ký khóa học:", classroom.course.name);
  };

  return (
    <div className={cx('content-3')}>
      <div className={cx('content-3-top')}>
        <div className={cx('content-3-left')}>
          <img className={cx('content-3-top-img')} src={getFileUrl(classroom.course.avatar)} alt="Project Experience" />
        </div>
        <CourseInfo
          classroomId={classroomId}
          onXemThem={handleXemThem}
        />
      </div>

      {isExpanded && (
        <div className={cx('content-3-bottom')}>
          <h4>Giáo trình</h4>
          <div className={cx('content-3-box')}>
            <CurriculumItem
              courseId={classroom.course.id}
            />
          </div>

          <div className={cx('content-3-bottom-button')}>
            <button onClick={handleOpenContact}>Đăng ký ngay</button>
          </div>
        </div>
      )}

      <ContactModal
        classroomId={classroomId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
