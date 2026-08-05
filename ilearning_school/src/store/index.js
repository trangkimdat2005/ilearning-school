import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../features/user/userSlice';
import companyReducer from '../features/company/companySlice';
import mentorReducer from '../features/mentor/mentorSlice';
import courseReducer from '../features/course/courseSlice';
import classroomReducer from '../features/classroom/classroomSlice';
import syllabusReducer from '../features/syllabus/syllabusSlice'; // import reducer của syllabus
import ratingReducer from '../features/rating/ratingSlice'; // import reducer của rating
import settingReducer from '../features/setting/settingSlice'; // import reducer của setting

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    mentor: mentorReducer,
    course: courseReducer,
    classroom: classroomReducer,
    syllabus: syllabusReducer,
    rating: ratingReducer,
    setting: settingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);