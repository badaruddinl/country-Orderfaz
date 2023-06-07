import api from '..';

export const getCallingCode = (callingCode) => api.get(`/v2/callingcode/${callingCode}`);