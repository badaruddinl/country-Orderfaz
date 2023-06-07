import api from '..';

export const getCurrency = (currency) => api.get(`/v2/currency/${currency}`);