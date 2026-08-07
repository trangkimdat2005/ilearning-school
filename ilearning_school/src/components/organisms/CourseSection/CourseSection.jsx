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
  const { list: classroomList, totalPages, loading, error } = useSelector((state) => state.classroom);

  // 1. Quản lý trạng thái màn hình và trang hiện tại
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = isMobile ? 3 : 5;

  // 2. Lắng nghe thay đổi màn hình (Chỉ reset khi giao cắt giữa PC và Mobile)
  useEffect(() => {
    const handleResize = () => {
      const currentlyMobile = window.innerWidth < 768;
      
      if (currentlyMobile !== isMobile) {
        setIsMobile(currentlyMobile);
        setCurrentPage(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // 3. Gọi API MỖI KHI `currentPage` hoặc `pageSize` thay đổi
  useEffect(() => {
    dispatch(
      fetchClassroomListRequest({
        criteria: {},
        pageable: { 
          page: currentPage, 
          size: pageSize, 
          sort: 'id,desc' 
        },
        page: currentPage 
      })
    );
  }, [dispatch, currentPage, pageSize]);

  // 4. Xử lý khi ấn nút "Xem thêm"
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 5. UX: Tránh nhấp nháy UI - Chỉ hiện "Đang tải" nếu là trang đầu tiên và chưa có dữ liệu
  if (loading && currentPage === 0 && (!classroomList || classroomList.length === 0)) {
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
      {currentPage < totalPages - 1 && (
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