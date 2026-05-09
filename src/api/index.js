import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://restcountries.com',
  headers: {
    Accept: 'application/json',
  },
});

export default api;
