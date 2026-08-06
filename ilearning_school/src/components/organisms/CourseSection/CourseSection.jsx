import CourseDetailCard from '../CourseDetailCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassroomListRequest } from '../../../features/classroom/classroomSlice';
import Button from "../../atoms/Button";
import classNames from 'classnames/bind';
import styles from './CourseSection.module.scss';

const cx = classNames.bind(styles);

export default function CourseSection() {
  const dispatch = useDispatch();
  const { list: classroomList, totalElements, loading, error } = useSelector((state) => state.classroom);

  // 1. Kiểm tra kích thước màn hình ngay từ lúc khởi tạo state
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [fetchSize, setFetchSize] = useState(() => window.innerWidth < 768 ? 3 : 5);

  // 2. Lắng nghe kích thước màn hình khi người dùng kéo/thu nhỏ cửa sổ
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < 768;
      setIsMobile(isCurrentlyMobile);
      
      // Nếu đổi từ Mobile (đang hiện 3) sang PC, ép nó lên 5
      // Nếu từ PC (đang hiện 5) sang Mobile, giữ nguyên 5 (không làm mất khóa học user đang xem)
      setFetchSize((prev) => Math.max(prev, isCurrentlyMobile ? 3 : 5));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const step = isMobile ? 3 : 5;

  // 3. Gọi API MỖI KHI `fetchSize` thay đổi
  useEffect(() => {
    dispatch(
      fetchClassroomListRequest({
        criteria: {},
        pageable: { page: 0, size: fetchSize, sort: 'id,desc' }, 
      })
    );
  }, [dispatch, fetchSize]);

  // 4. Xử lý khi ấn nút "Xem thêm"
  const handleLoadMore = () => {
    setFetchSize((prevCount) => prevCount + step);
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
      {classroomList.map((classroom) => (
        <CourseDetailCard
          key={classroom.id}
          classroomId={classroom.id}
        />
      ))}

      {classroomList.length < totalElements && (
        <Button 
          className={cx('content-button-all-lean')} 
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? 'Đang tải thêm...' : 'Xem thêm khóa học'}
        </Button>
      )}
    </div>
  );
}