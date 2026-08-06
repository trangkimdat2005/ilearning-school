import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { mentorsDataList } from '../../../data/mentorsData';
import { fetchMentorListRequest } from '../../../features/mentor/mentorSlice';
import { getFileUrl } from '../../../utils/fileUrl'
import classNames from 'classnames/bind';
import styles from './MentorCarousel.module.scss';

const cx = classNames.bind(styles);

export default function MentorCarousel() {

    const dispatch = useDispatch();
    const { list: mentorList, loading, error, totalElements, urlBase } = useSelector((state) => state.mentor);
    const carouselId = "slide-1";

    useEffect(() => {
        dispatch(
            fetchMentorListRequest({
                criteria: {},
                pageable: {},
            })
        );
    }, [dispatch]);

    if (loading) return (
        <>
            <p>Đang tải...</p>
        </>

    );
    if (error) return (
        <>
            <p>Lỗi: {error}</p>
            {console.log('Error:', error)}
        </>
    );
    if (!mentorList.length) return null;

    return (
        <div className={cx('content-6')}>
            <div id={carouselId} className={cx('carousel', 'slide')} data-bs-ride="carousel">

                <div className={cx('carousel-indicators', 'content-6-btn-indicators')}>
                    {mentorList.map((_, index) => (
                        <button
                            key={`indicator-${index}`}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                        ></button>
                    ))}
                </div>

                <div className={cx('carousel-inner')}>
                    {mentorList.map((mentor, index) => (
                        <div key={mentor.id} className={cx('carousel-item', { active: index === 0 })}>
                            <div className={cx('content-6-slide')}>
                                <div className={cx('content-6-left')}>
                                    <img src={getFileUrl(mentor.account.avatarPath)} alt="Profile Photo" />
                                </div>

                                <div className={cx('content-6-right')}>
                                    <div className={cx('content-6-right-slide-top')}>
                                        <h3>"</h3>
                                        <p>{mentor.description}</p>
                                    </div>

                                    <div className={cx('content-6-right-slide-bottom')}>
                                        <h4>{mentor.account?.fullName}</h4>
                                        <p>{mentor.position || mentor.account?.fullName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className={cx('carousel-control-prev', 'content-6-button-prev')}
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="prev"
                >
                    <span>&#10094;</span>
                </button>
                <button
                    className={cx('carousel-control-next', 'content-6-button-next')}
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="next"
                >
                    <span>&#10095;</span>
                </button>

            </div>
        </div>
    );
}
