import api from '../../lib/api';

const TARGET = '/items'; 

export default {
  getAll: () => api.get(TARGET),

  filter: (searchInput) => api.get(`${TARGET}/filter`, {
    params: {
      searchInput,
    }
  }),

  get: (id) => api.get(`${TARGET}/${id}`),

  add: (payload) => api.post(TARGET),

  update: (id, payload) => api.put(`${TARGET}/${id}`),

  delete: (id) => api.delete(`${TARGET}/${id}`),
};