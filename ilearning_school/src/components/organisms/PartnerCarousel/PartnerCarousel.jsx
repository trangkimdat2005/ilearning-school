import { useEffect, useRef } from 'react';
import { partnersSlideList } from '../../../data/partnersData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyListRequest } from '../../../features/company/companySlice';
import './PartnerCarousel.module.scss';
import { getFileUrl } from '../../../utils/fileUrl'

export default function PartnerCarousel() {
  const dispatch = useDispatch();
  const { list: companyList, loading, error, totalElements, urlBase } = useSelector((state) => state.company);


  const allLogos = companyList.map((company) => ({
    src: getFileUrl(company.avatar),
    alt: company.name,
  }));
  // Nhân 3 danh sách
  const duplicatedLogos = [...allLogos, ...allLogos, ...allLogos];

  const carouselRef = useRef(null);
  const isAutoScrolling = useRef(true); // Biến kiểm soát trạng thái tự cuộn
  const animationRef = useRef(null);

  // Hàm tự động nhích cuộn (1px mỗi khung hình)
  const autoScroll = () => {
    if (carouselRef.current && isAutoScrolling.current) {
      carouselRef.current.scrollLeft += 1; // Chỉnh số 1 thành 2, 3 nếu muốn cuộn nhanh hơn
    }
    // Lặp lại hàm này liên tục theo tần số quét màn hình
    animationRef.current = requestAnimationFrame(autoScroll);
  };

  useEffect(() => {
    dispatch(
      fetchCompanyListRequest({
        criteria: { name: '', status: 1 },
        pageable: { page: 0, size: 10, sort: 'id,desc' },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!allLogos.length) return;
    const carousel = carouselRef.current;
    if (carousel) {
      setTimeout(() => {
        // Đưa vị trí cuộn ban đầu vào khúc giữa
        carousel.scrollLeft = carousel.scrollWidth / 3;

        // Bắt đầu gọi hàm tự động cuộn
        animationRef.current = requestAnimationFrame(autoScroll);
      }, 100);
    }

    // Cleanup khi chuyển trang khác
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [allLogos.length]);

  // Reset vị trí ngầm khi chạm 2 đầu mép để tạo vòng lặp vô tận
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const oneThird = carousel.scrollWidth / 3;

    if (carousel.scrollLeft <= 0) {
      carousel.scrollLeft = oneThird;
    } else if (carousel.scrollLeft >= oneThird * 2) {
      carousel.scrollLeft = oneThird;
    }
  };

  // Tạm dừng tự cuộn một lúc khi dùng nút bấm để tránh xung đột hiệu ứng
  const scrollWithButton = (amount) => {
    isAutoScrolling.current = false; // Dừng tự cuộn
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
    // Đợi 600ms (thời gian chạy xong smooth scroll) rồi cho tự cuộn lại
    setTimeout(() => {
      isAutoScrolling.current = true;
    }, 600);
  };

  const handlePrev = () => scrollWithButton(-250);
  const handleNext = () => scrollWithButton(250);

  if (loading) return (
    <>
      <p>Đang tải...</p>
      {console.log('Loading...')}
    </>

  );
  if (error) return (
    <>
      <p>Lỗi: {error}</p>
      {console.log('Error:', error)}
    </>
  );
  if (!allLogos.length) return null;

  return (
    <div
      className="content-7 relative-container"
      // Xử lý cho Chuột (Máy tính)
      onMouseEnter={() => { isAutoScrolling.current = false; }}
      onMouseLeave={() => { isAutoScrolling.current = true; }}
      // Xử lý cho Cảm ứng (Điện thoại/Tablet)
      onTouchStart={() => { isAutoScrolling.current = false; }} // Dừng khi ngón tay chạm vào
      onTouchEnd={() => { isAutoScrolling.current = true; }}    // Chạy tiếp khi nhấc ngón tay ra
    >
      <div
        className="carousel-infinite-wrapper"
        ref={carouselRef}
        onScroll={handleScroll}
      >
        <div className="carousel-infinite-track">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="carousel-item-logo">
              <img src={logo.src} alt={logo.alt || `partner-${index}`} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-control-prev content-7-button-prev custom-nav-btn"
        type="button"
        onClick={handlePrev}
      >
        <span>←</span>
      </button>

      <button
        className="carousel-control-next content-7-button-next custom-nav-btn"
        type="button"
        onClick={handleNext}
      >
        <span>→</span>
      </button>
    </div>
  );
}