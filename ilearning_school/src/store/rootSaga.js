import { all } from 'redux-saga/effects';
import userSaga from '../features/user/userSaga';
import companySaga from '../features/company/companySaga';
import mentorSaga from '../features/mentor/mentorSaga';
import courseSaga from '../features/course/courseSaga'; // import saga của course
import classroomSaga from '../features/classroom/classroomSaga'; // import saga của classroom
import syllabusSaga from '../features/syllabus/syllabusSaga'; // import saga của syllabus
import ratingSaga from '../features/rating/ratingSaga'; // import saga của rating
import settingSaga from '../features/setting/settingSaga'; // import saga của setting

export default function* rootSaga() {
  yield all([
    userSaga(),
    companySaga(),
    mentorSaga(),
    courseSaga(),
    classroomSaga(),
    syllabusSaga(),
    ratingSaga(),
    settingSaga(),
    // thêm các saga khác ở đây
  ]);
}