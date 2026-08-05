import { useState, useEffect, useMemo } from 'react';
import TestimonialCard from '../../molecules/TestimonialCard';
// import { testimonialsList } from '../../../data/testimonialsData'; // Bỏ nếu không dùng đến
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatingListRequest } from '../../../features/rating/ratingSlice';

export default function TestimonialSection() {
  const dispatch = useDispatch();
  const { list: ratingList, loading, error, totalElements, urlBase } = useSelector((state) => state.rating);
  const [isMobile, setIsMobile] = useState(false);
  const carouselId = "testimonial-slide";

  useEffect(() => {
    dispatch(
      fetchRatingListRequest({
        criteria: {},
        pageable: { page: 0, size: 10, sort: 'id,desc' },
      })
    );
  }, [dispatch]);

  // Lắng nghe kích thước màn hình để chuyển đổi số lượng item trên 1 slide
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // HÀM GOM NHÓM DỮ LIỆU (Chunk Array)
  const groupedTestimonials = useMemo(() => {
    if (!ratingList || ratingList.length === 0) return [];

    const chunkSize = isMobile ? 1 : 3;
    const chunks = [];

    for (let i = 0; i < ratingList.length; i += chunkSize) {
      let chunk = ratingList.slice(i, i + chunkSize);

      // Nếu đang ở PC, mảng gốc có hơn 3 thẻ, và slide hiện tại bị thiếu thẻ (lẻ 1 hoặc 2)
      if (!isMobile && ratingList.length > 3 && chunk.length < chunkSize) {
        // Lấy thêm các thẻ từ đầu danh sách để đắp vào cho đủ 3
        const deficit = chunkSize - chunk.length;
        chunk = [...chunk, ...ratingList.slice(0, deficit)];
      }

      chunks.push(chunk);
    }
    return chunks;
  }, [isMobile, ratingList]); // Thêm ratingList vào dependency

  if (loading) return <p>Đang tải...</p>;
  if (error) {
    console.log('Error:', error);
    return <p>Lỗi: {error}</p>;
  }
  
  if (!ratingList?.length) return null;

  return (
    <div className="content-5">
      <div id={carouselId} className="carousel slide" data-bs-ride="carousel">

        {/* CÁC NÚT INDICATOR (Chấm tròn ở dưới) */}
        {groupedTestimonials.length > 1 && (
          <div className="carousel-indicators content-5-btn-indicators">
            {groupedTestimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></button>
            ))}
          </div>
        )}

        {/* NỘI DUNG SLIDE */}
        <div className="carousel-inner content-5-inner">
          {groupedTestimonials.map((rating, index) => (
            <div key={index} className={`carousel-item  ${index === 0 ? "active" : ""} px` }>
              <div className="row justify-content-center content-5-slide">
                {rating.map((item, itemIndex) => (
                  // Dùng item.id kết hợp index nếu thẻ bị lặp lại để tránh lỗi duplicate key của React
                  <div key={`${item.id}-${itemIndex}`} className={`${isMobile ? "col-12" : "col-md-4"} content-5-inner-item`}>
                    <TestimonialCard testimonial={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NÚT ĐIỀU HƯỚNG */}
        {groupedTestimonials.length > 1 && (
          <>
            <button
              className="carousel-control-prev content-5-button-prev"
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="prev"
            >
              <span aria-hidden="true">&#10094;</span>
            </button>

            <button
              className="carousel-control-next content-5-button-next"
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="next"
            >
              <span aria-hidden="true">&#10095;</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
}