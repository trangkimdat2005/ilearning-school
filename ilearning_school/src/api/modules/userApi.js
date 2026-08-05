import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const userApi = {
  getById: (id) => axiosClient.get(ENDPOINTS.USER.GET_BY_ID(id)),
  update: (id, data) => axiosClient.put(ENDPOINTS.USER.UPDATE(id), data),
  list: (params) => axiosClient.get(ENDPOINTS.USER.LIST, { params }),
};

export default userApi;