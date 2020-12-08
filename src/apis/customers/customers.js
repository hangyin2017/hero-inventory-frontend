import api from '../../lib/api';

const URL = '/customers'; 

export default {
  getAll: () => api.get(URL),

  filter: (searchInput) => api.get(`${URL}/filter`, {
    params: {
      searchInput,
    }
  }),

  get: (id) => api.get(`${URL}/${id}`),

  add: (payload) => api.post(URL, payload),

  update: (id, payload) => api.put(`${URL}/${id}`, payload),

  remove: (id) => api.delete(`${URL}/${id}`),
};