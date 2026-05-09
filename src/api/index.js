import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'https://restcountries.com';

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
