import api from '../../lib/api';

const TARGET = '/salesorders'; 

export default {
  getAll: () => api.get(TARGET),

  filter: (searchInput) => api.get(`${TARGET}/filter`, {
    params: {
      searchInput,
    }
  }),

  get: (id) => api.get(`${TARGET}/${id}`),

  add: (payload) => api.post(TARGET),

  modify: (id, payload) => api.put(`${TARGET}/${id}`),

  remove: (id) => api.delete(`${TARGET}/${id}`),
};