import api from './api';

export const getAll = (range) => api.get(`/${range}`);