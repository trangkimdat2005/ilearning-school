// src/api/modules/courseApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const courseApi = {
  /**
   * @param {Object} params
   * @param {Object} params.criteria
   * @param {Object} params.pageable
   */
  getList: ({ criteria = {}, pageable = {} }) => {
    const { page = 0, size = 100, sort = [] } = pageable;

    return axiosClient.get(ENDPOINTS.COURSE.LIST, {
      params: {
        ...criteria,
        page,
        size,
        sort,
      },
    });
  },
};

export default courseApi;