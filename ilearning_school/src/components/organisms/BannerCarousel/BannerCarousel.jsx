import { useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import BannerSlide from '../../molecules/BannerSlide';
import { Carousel } from 'bootstrap';
import ContactModal from '../ContactModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingListByKeyRequest } from '../../../features/setting/settingSlice';
import styles from './BannerCarousel.module.scss';

const cx = classNames.bind(styles);

export default function BannerCarousel() {
  const dispatch = useDispatch();
  const { 
    settingByKey: settingFindByKeyList, 
    loadingByKey: loading, 
    errorByKey: error, 
    urlBase 
  } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchSettingListByKeyRequest('page_config'));
  }, [dispatch]);

  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimating = useRef(false);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const slideData = useMemo(() => {
    if (!settingFindByKeyList || settingFindByKeyList.length === 0) return [];
    
    try {
      const rawValueData = settingFindByKeyList[0].valueData;
      const parsedData = JSON.parse(rawValueData);
      return parsedData.slider || []; 
    } catch (err) {
      console.error("Lỗi parse JSON:", err);
      return [];
    }
  }, [settingFindByKeyList]);

  const totalSlides = slideData.length;
  const segment = totalSlides > 0 ? 100 / totalSlides : 100;

  useEffect(() => {
    const carouselEl = carouselRef.current;
    
    if (!carouselEl) return;

    const carouselInstance = Carousel.getOrCreateInstance(carouselEl);

    const handleSlideStart = () => { isAnimating.current = true; };
    const handleSlideEnd = (event) => {
      isAnimating.current = false;
      setActiveIndex(event.to);
    };

    const handleDragStart = (e) => {
      if (isAnimating.current) return;
      isDragging.current = true;
      startX.current = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    };

    const handleDragEnd = (e) => {
      if (!isDragging.current || isAnimating.current) return;
      isDragging.current = false;

      const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
      const diffX = startX.current - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          carouselInstance.next(); 
        } else {
          carouselInstance.prev(); 
        }
      }
    };

    carouselEl.addEventListener('slide.bs.carousel', handleSlideStart);
    carouselEl.addEventListener('slid.bs.carousel', handleSlideEnd);
    carouselEl.addEventListener('mousedown', handleDragStart);
    carouselEl.addEventListener('mouseup', handleDragEnd);
    carouselEl.addEventListener('mouseleave', handleDragEnd); 
    carouselEl.addEventListener('touchstart', handleDragStart, { passive: true });
    carouselEl.addEventListener('touchend', handleDragEnd);

    return () => {
      carouselEl.removeEventListener('slide.bs.carousel', handleSlideStart);
      carouselEl.removeEventListener('slid.bs.carousel', handleSlideEnd);
      carouselEl.removeEventListener('mousedown', handleDragStart);
      carouselEl.removeEventListener('mouseup', handleDragEnd);
      carouselEl.removeEventListener('mouseleave', handleDragEnd);
      carouselEl.removeEventListener('touchstart', handleDragStart);
      carouselEl.removeEventListener('touchend', handleDragEnd);
    };
  }, [loading, slideData]);

  const handleTrackClick = (e) => {
    if (!trackRef.current || !carouselRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentClicked = clickX / rect.width;
    const targetIndex = Math.min(
      totalSlides - 1,
      Math.max(0, Math.floor(percentClicked * totalSlides))
    );

    const carouselInstance = Carousel.getOrCreateInstance(carouselRef.current);
    carouselInstance.to(targetIndex);
  };

  // CÁC ĐIỀU KIỆN RETURN NẰM SAU HOOKS
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!slideData.length) return null; // Check theo slideData đã parse

  return (
    <div className={cx('content-img')}>
      <div
        id="myCarousel"
        className={cx('carousel','slide')}
        data-bs-ride="carousel"
        data-bs-interval="3000"
        ref={carouselRef}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <div className={cx('carousel-inner', 'content-img-inner')}>
          {slideData.map((slide, index) => {
            return (
              <BannerSlide
                key={index}
                isActive={index === activeIndex}
                bgUrl={slide.image}
                title={slide.title}
                description={slide.description}
                link = {slide?.url}
              />
            );
          })}
        </div>
      </div>

      <div id="progressTrack" className={cx('content-img-progressTrack')} ref={trackRef} onClick={handleTrackClick}>
        <div
          id="progressFill"
          className={cx('content-img-progressFill')}
          style={{
            width: `${segment}%`,
            left: `${activeIndex * segment}%`
          }}
        ></div>
      </div>
    </div>
  );
}