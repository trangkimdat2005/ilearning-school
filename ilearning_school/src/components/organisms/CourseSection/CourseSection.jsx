import CourseDetailCard from '../CourseDetailCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassroomListRequest } from '../../../features/classroom/classroomSlice';
import Button from "../../atoms/Button";
import './CourseSection.module.scss';
import classNames from 'classnames/bind';
import styles from './CourseSection.module.scss';

const cx = classNames.bind(styles);

export default function CourseSection() {
  const dispatch = useDispatch();
  const { list: classroomList, loading, error } = useSelector((state) => state.classroom);

  // 1. Khởi tạo state
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // 2. Lắng nghe kích thước màn hình LIÊN TỤC
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // 3. TỰ ĐỘNG CẬP NHẬT số lượng hiển thị mỗi khi isMobile thay đổi
  useEffect(() => {
    setVisibleCount(isMobile ? 3 : 5);
  }, [isMobile]); // Lắng nghe sự thay đổi của state isMobile

  const step = isMobile ? 3 : 5;
  const limitedClassrooms = (classroomList || []).slice(0, visibleCount);

  // 4. Gọi API
  useEffect(() => {
    dispatch(
      fetchClassroomListRequest({
        criteria: {},
        pageable: { page: 0, size: 50, sort: 'id,desc' }, 
      })
    );
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + step);
  };

  if (loading && (!classroomList || classroomList.length === 0)) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  if (!classroomList || classroomList.length === 0) return null;

  return (
    <div className={cx('courses-list-section')}>
      {limitedClassrooms.map((classroom) => (
        <CourseDetailCard
          key={classroom.id}
          classroomId={classroom.id}
        />
      ))}
      
      {visibleCount < classroomList.length && (
        <Button className={cx('content-button-all-lean')} onClick={handleLoadMore}>
          Xem thêm khóa học
        </Button>
      )}
    </div>
  );
}