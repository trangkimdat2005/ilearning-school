// src/api/modules/syllabusApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const syllabusApi = {
  /**
   * @param {Object} params
   * @param {Object} params.criteria
   * @param {Object} params.pageable
   */
  getPublicList: ({ criteria = {}, pageable = {} }) => {
    const { page = 0, size = 100, sort = [] } = pageable;

    return axiosClient.get(ENDPOINTS.SYLLABUS.PUBLIC_LIST, {
      params: {
        ...criteria,
        page,
        size,
        sort,
      },
    });
  },
};

export default syllabusApi;