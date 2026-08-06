import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import plusIcon from '../../../assets/images/cong.png';
import minusIcon from '../../../assets/images/tru.png';
import styles from './CurriculumItem.module.scss';
import { fetchSyllabusListRequest, selectSyllabusByType } from '../../../features/syllabus/syllabusSlice';

const cx = classNames.bind(styles);


const ChapterItem = ({ chapter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx('content-3-box-1')}>
      <div className={cx('content-3-box-top')}>
        <p className={`line-clamp-1`}>{chapter.name}</p>
        <div className={cx('content-3-box-top-right')}>
          <div className={cx('content-3-box-top-session')}>
            {chapter.lessons.length} bài học
          </div>

          <button className={cx('toggle-btn')} onClick={() => setIsOpen(!isOpen)}>
            <img
              src={isOpen ? minusIcon : plusIcon}
              alt={isOpen ? "Minus Icon" : "Plus Icon"}
              className={cx('icon-toggle', { rotate: isOpen })}
            />
          </button>
        </div>
      </div>

      <div className={cx('content-3-box-bottom', 'toggle-box', { hidden: !isOpen })}>
        <ul>
          {chapter.lessons.map((lesson) => (
            <li className='line-clamp-1' key={lesson.id}>
              {lesson.name?.trim()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Component chính
export default function CurriculumItem({ courseId }) {
  const dispatch = useDispatch();
  const { list: syllabusList, loading, error } = useSelector((state) =>
    selectSyllabusByType(state, courseId)
  );

  useEffect(() => {
    if (!courseId) return;
    dispatch(
      fetchSyllabusListRequest({
        typeKey: courseId,
        criteria: { courseId: courseId },
        pageable: {
          page: 0,
          size: 100,
          sort: ["ordering,asc"]
        },
      })
    );
  }, [dispatch]);

  console.log('courseId: ', courseId)
  console.log('syllabusList: ', syllabusList)

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!syllabusList || syllabusList.length === 0) return null;

  // THUẬT TOÁN GOM NHÓM: Phân loại kind 1 (Cha) và kind 2 (Con)
  const groupedSyllabus = [];
  let currentChapter = null;

  syllabusList.forEach((item) => {
    if (item.kind === 1) {
      currentChapter = { ...item, lessons: [] };
      groupedSyllabus.push(currentChapter);
    } else if (item.kind === 2) {
      if (currentChapter) {
        currentChapter.lessons.push(item);
      }
    }
  });

  return (
    <>
      {groupedSyllabus.map((chapter) => (
        <ChapterItem key={chapter.id} chapter={chapter} />
      ))}
    </>
  );
}