import api from '..';

export const getCountries = (country) => api.get(`/v3.1/name/${country}`);

export const getCountriesDetail = (countryName) => api.get(`/v3.1/name/${countryName}?fullText=true`);
