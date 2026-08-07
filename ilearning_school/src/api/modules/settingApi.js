// src/api/modules/settingApi.js
import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

const settingApi = {
  getPublicList: () => {
    return axiosClient.get(ENDPOINTS.SETTING.PUBLIC_LIST);
  },
  findByKey: (keyValue) => {
    return axiosClient.get(ENDPOINTS.SETTING.FIND_BY_KEY, {
      params: { keyNames: keyValue },
    });
  }
};

export default settingApi;