import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: '*/*',
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
);

export default api;
