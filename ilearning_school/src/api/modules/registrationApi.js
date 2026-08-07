// src/api/modules/registrationApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const registrationApi = {
  /**
   * Tạo yêu cầu/đăng ký lớp học
   * @param {Object} data - Payload gửi lên server
   * @param {number} data.classroomId - ID của lớp học
   * @param {string} data.fullName - Họ và tên người đăng ký
   * @param {string} data.email - Địa chỉ email
   * @param {string} data.phone - Số điện thoại liên hệ
   * @param {string} data.message - Lời nhắn hoặc ghi chú thêm
   */
  create: (data) => {
    return axiosClient.post(ENDPOINTS.REGISTRATION.CREATE, data);
  },
};

export default registrationApi;