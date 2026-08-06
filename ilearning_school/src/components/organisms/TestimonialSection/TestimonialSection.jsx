import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TestimonialCard from '../../molecules/TestimonialCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatingListRequest } from '../../../features/rating/ratingSlice';
import styles from './TestimonialSection.module.scss';

const cx = classNames.bind(styles);

export default function TestimonialSection() {
  const dispatch = useDispatch();
  const { list: ratingList, totalPages, loading, error } = useSelector((state) => state.rating);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [currentPage, setCurrentPage] = useState(0);

  // Lắng nghe kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCurrentPage(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    dispatch(
      fetchRatingListRequest({
        criteria: {},
        pageable: {
          page: currentPage,
          size: isMobile ? 1 : 3
        },
      })
    );
  }, [dispatch, currentPage, isMobile]);

  // Hàm xử lý chuyển trang
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading && (!ratingList || ratingList.length === 0)) {
    return <p>Đang tải...</p>;
  }
  if (error) return <p>Lỗi: {error}</p>;
  if (!ratingList?.length) return null;

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className={cx('content-5')}>
      <div className={cx('carousel', 'slide')}>

        {totalPages > 1 && (
          <div className={cx('carousel-indicators', 'content-5-btn-indicators')}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                className={cx({ active: index === currentPage })}
                onClick={() => setCurrentPage(index)}
                aria-current={index === currentPage ? "true" : "false"}
              ></button>
            ))}
          </div>
        )}

        <div className={cx('carousel-inner', 'content-5-inner')}
          style={{
            opacity: loading ? 0.5 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: loading ? 'none' : 'auto'
          }}
        >
          <div className={`${cx('carousel-item')} active`}>
            <div className={cx('row', 'content-5-slide')}>
              {ratingList.map((item, itemIndex) => (
                <div
                  key={`${item.id || itemIndex}`}
                  className={`${isMobile ? "col-12" : "col-md-4"} ${cx('content-5-inner-item')}`}
                >
                  <TestimonialCard testimonial={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <>
            <button
              className={cx('carousel-control-prev', 'content-5-button-prev', { disabled: isFirstPage })}
              type="button"
              onClick={handlePrev}
              disabled={isFirstPage}
            >
              <span aria-hidden="true">&#10094;</span>
            </button>

            <button
              className={cx('carousel-control-next', 'content-5-button-next', { disabled: isLastPage })}
              type="button"
              onClick={handleNext}
              disabled={isLastPage}
            >
              <span aria-hidden="true">&#10095;</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
}