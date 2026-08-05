import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseDetailCard.module.scss';
import CourseInfo from '../../molecules/CourseInfo';
import CurriculumItem from '../../molecules/CurriculumItem';
import { getFileUrl } from '../../../utils/fileUrl'
import { fetchSyllabusListRequest } from '../../../features/syllabus/syllabusSlice';

export default function CourseDetailCard({ classroomId }) {

  const classroom = useSelector((state) =>
    state.classroom.list.find((c) => c.id === classroomId)
  );

  if (!classroom) return null;





  const dispatch = useDispatch();
  const { list: syllabusList, loading, error, totalElements, urlBase } = useSelector((state) => state.syllabus);

  useEffect(() => {
    dispatch(
      fetchSyllabusListRequest({
        criteria: { courseId: classroom.course.id },
        pageable: { page: 0, size: 10, sort: 'id,desc' },
      })
    );
  }, [dispatch]);





  const [isExpanded, setIsExpanded] = useState(false);

  const handleXemThem = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDangKy = () => {
    console.log("Đăng ký khóa học:", classroom.course.name);
  };

  return (
    <div className="content-3">
      <div className="content-3-top">
        <div className="content-3-left">
          <img className="content-3-top-img" src={getFileUrl(classroom.course.avatar)} alt="Project Experience" />
        </div>


        <CourseInfo
          classroomId={classroomId}
          onXemThem={handleXemThem}
        />
      </div>

      {isExpanded && (
        <div className="content-3-bottom">
          <h4>Giáo trình</h4>
          <div className="content-3-box">
            {loading ? (
              <>
                <p>Đang tải...</p>
                {console.log('Loading...')}
              </>
            ) : error ? (
              <>
                <p>Lỗi: {error}</p>
                {console.log('Error:', error)}
              </>
            ) : !syllabusList || syllabusList.length === 0 ? (
              null
            ) : (
              syllabusList.map((section, index) => {
                const descriptionItems = section.description
                  ? section.description.split('\n').filter(Boolean)
                  : [];

                return (
                  <CurriculumItem
                    key={index}
                    syllabusId={section.id}
                  >
                    {descriptionItems.length > 0 && (
                      <ul>
                        {descriptionItems.map((item, itemIndex) => (
                          <li className='line-clamp-1' key={itemIndex}>{item.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </CurriculumItem>
                );
              })
            )}
          </div>

          <div className="content-3-bottom-button">
            <button onClick={handleDangKy}>Đăng ký ngay</button>
          </div>
        </div>
      )}
    </div>
  );
}
