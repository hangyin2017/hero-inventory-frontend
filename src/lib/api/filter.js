import api from './api';

export const filter = (range, searchInput) => api.get(`/${range}/filter`, {
  params: {
    searchInput,
  }
});