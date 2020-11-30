import api from '../../lib/api';

const URL = '/items'; 

export default {
  getAll: () => api.get(URL),

  filter: (searchInput) => api.get(`${URL}/filter`, {
    params: {
      searchInput,
    }
  }),

  get: (id) => api.get(`${URL}/${id}`),

  add: (payload) => api.post(URL),

  update: (id, payload) => api.put(`${URL}/${id}`),

  delete: (id) => api.delete(`${URL}/${id}`),
};