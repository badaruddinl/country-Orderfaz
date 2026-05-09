import api from '..';

export const getCountries = (country) => api.get(`/v3.1/name/${encodeURIComponent(country)}`);

export const getCountriesDetail = (countryName) =>
  api.get(`/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
