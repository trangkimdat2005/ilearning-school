// src/api/modules/mentorApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const mentorApi = {
  /**
   * @param {Object} params
   * @param {Object} params.criteria - { id, name, status }
   * @param {Object} params.pageable - { page, size, sort }
   */
  getPublicList: ({ criteria = {}, pageable = {} }) => {
    const { page = 0, size = 10, sort = [] } = pageable;

    return axiosClient.get(ENDPOINTS.MENTOR.PUBLIC_LIST, {
      params: {
        ...criteria,
        page,
        size,
        sort,
      },
    });
  },
};

export default mentorApi;