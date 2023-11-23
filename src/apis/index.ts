import axios from 'axios';

import {API_URI} from '@env';

const apiClient = () => {
  return axios.create({
    baseURL: API_URI,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default apiClient;
