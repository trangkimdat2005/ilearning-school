import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import TestimonialCard from '../../molecules/TestimonialCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatingListRequest } from '../../../features/rating/ratingSlice';
import styles from './TestimonialSection.module.scss';

const cx = classNames.bind(styles);

export default function TestimonialSection() {
  const dispatch = useDispatch();
  const { list: ratingList, loading, error } = useSelector((state) => state.rating);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselId = "testimonial-slide";

  useEffect(() => {
    dispatch(
      fetchRatingListRequest({
        criteria: {},
        pageable: { page: 0, size: 10, sort: 'id,desc' },
      })
    );
  }, [dispatch]);

  // Lắng nghe kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // HÀM GOM NHÓM DỮ LIỆU
  const groupedTestimonials = useMemo(() => {
    if (!ratingList || ratingList.length === 0) return [];

    const chunkSize = isMobile ? 1 : 3;
    const chunks = [];

    for (let i = 0; i < ratingList.length; i += chunkSize) {
      const chunk = ratingList.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    return chunks;
  }, [isMobile, ratingList]);

  // Lắng nghe sự kiện chuyển slide của Bootstrap để cập nhật activeIndex
  useEffect(() => {
    const carouselElement = document.getElementById(carouselId);

    const handleSlide = (event) => {
      setActiveIndex(event.to);
    };

    if (carouselElement) {
      carouselElement.addEventListener('slid.bs.carousel', handleSlide);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
      }
    };
  }, [groupedTestimonials]);

  if (loading) return <p>Đang tải...</p>;
  if (error) {
    console.log('Error:', error);
    return <p>Lỗi: {error}</p>;
  }

  if (!ratingList?.length) return null;

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === groupedTestimonials.length - 1;

  return (
    <div className={cx('content-5')}>
      <div id={carouselId} className={cx('carousel', 'slide')} data-bs-interval="false" data-bs-wrap="false">

        {groupedTestimonials.length > 1 && (
          <div className={cx('carousel-indicators', 'content-5-btn-indicators')}>
            {groupedTestimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide-to={index}
                className={index === activeIndex ? "active" : ""}
                aria-current={index === activeIndex ? "true" : "false"}
              ></button>
            ))}
          </div>
        )}

        <div className={cx('carousel-inner', 'content-5-inner')}>
          {groupedTestimonials.map((rating, index) => (
            <div key={index} className={cx('carousel-item', { active: index === 0 })}>
              <div className={cx('row', 'content-5-slide')}>
                {rating.map((item, itemIndex) => (
                  <div key={`${item.id}-${itemIndex}`} className={cx('content-5-inner-item', {
                    'col-12': isMobile,
                    'col-md-4': !isMobile
                  })}
                  >
                    <TestimonialCard testimonial={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {groupedTestimonials.length > 1 && (
          <>
            <button
              className={cx('carousel-control-prev', 'content-5-button-prev', { disabled: isFirstSlide })}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="prev"
              disabled={isFirstSlide}
            >
              <span aria-hidden="true">&#10094;</span>
            </button>

            <button
              className={cx('carousel-control-next', 'content-5-button-next', { disabled: isLastSlide })}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="next"
              disabled={isLastSlide}
            >
              <span aria-hidden="true">&#10095;</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
}