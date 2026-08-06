// src/api/modules/classroomApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const classroomApi = {
  /**
   * @param {Object} params
   * @param {Object} params.criteria - { id, name, status }
   * @param {Object} params.pageable - { page, size, sort }
   */
  getPublicList: ({ criteria = {}, pageable = {} }) => {
    const { page = 0, size = 100, sort = [] } = pageable;

    return axiosClient.get(ENDPOINTS.CLASSROOM.PUBLIC_LIST, {
      params: {
        ...criteria,
        page,
        size,
        sort,
      },
    });
  },
};

export default classroomApi;