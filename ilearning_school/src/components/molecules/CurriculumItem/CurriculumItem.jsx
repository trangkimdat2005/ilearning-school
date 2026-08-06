import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import plusIcon from '../../../assets/images/cong.png';
import minusIcon from '../../../assets/images/tru.png';
import styles from './CurriculumItem.module.scss';
import { fetchSyllabusListRequest } from '../../../features/syllabus/syllabusSlice';

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
export default function CurriculumItem({courseId}) {
  const dispatch = useDispatch();
  const { list: syllabusList, loading, error } = useSelector((state) => state.syllabus);

  useEffect(() => {
    // Đã sửa lại thành gọi API của Syllabus thay vì Mentor
    dispatch(
      fetchSyllabusListRequest({
        criteria: {courseId: courseId }, // Tuỳ chỉnh trạng thái nếu cần
        pageable: { 
          page: 0, 
          size: 100, // Nên để size lớn để lấy đủ bài học trong khóa
          sort: ["ordering,asc"] // RẤT QUAN TRỌNG: Phải sort tăng dần theo ordering để kind 1 nằm trên kind 2
        },
      })
    );
  }, [dispatch]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!syllabusList || syllabusList.length === 0) return null;

  // THUẬT TOÁN GOM NHÓM: Phân loại kind 1 (Cha) và kind 2 (Con)
  const groupedSyllabus = [];
  let currentChapter = null;

  syllabusList.forEach((item) => {
    if (item.kind === 1) {
      // Nếu là kind 1 -> Tạo một đối tượng Chương mới, thêm mảng lessons rỗng
      currentChapter = { ...item, lessons: [] };
      groupedSyllabus.push(currentChapter);
    } else if (item.kind === 2) {
      // Nếu là kind 2 -> Đẩy vào mảng lessons của Chương gần nhất phía trên nó
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