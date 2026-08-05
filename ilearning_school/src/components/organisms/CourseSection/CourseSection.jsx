import CourseDetailCard from '../CourseDetailCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassroomListRequest } from '../../../features/classroom/classroomSlice';
import Button from "../../atoms/Button";
import './CourseSection.module.scss';

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

    // Gọi lần đầu khi component vừa render
    handleResize(); 

    // Đăng ký lắng nghe sự kiện thay đổi kích thước
    window.addEventListener('resize', handleResize);
    
    // Dọn dẹp sự kiện khi component bị huỷ (unmount)
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Cặp ngoặc vuông rỗng [] nghĩa là chỉ đăng ký listener 1 lần duy nhất

  // 3. TỰ ĐỘNG CẬP NHẬT số lượng hiển thị mỗi khi isMobile thay đổi
  useEffect(() => {
    // Nếu màn hình co/giãn qua mốc 768px, tự động reset về 3 (mobile) hoặc 5 (PC)
    setVisibleCount(isMobile ? 3 : 5);
  }, [isMobile]); // Lắng nghe sự thay đổi của state isMobile

  // Bước nhảy để load thêm
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
    <div className="courses-list-section">
      {limitedClassrooms.map((classroom) => (
        <CourseDetailCard
          key={classroom.id}
          classroomId={classroom.id}
        />
      ))}
      
      {visibleCount < classroomList.length && (
        <Button className="content-button-all-lean" onClick={handleLoadMore}>
          Tất cả khoá học
        </Button>
      )}
    </div>
  );
}