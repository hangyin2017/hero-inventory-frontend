import api from '../../lib/api';

const TARGET = '/manufacturers'; 

export default {
  getAll: () => api.get(TARGET),

  add: (payload) => api.post(TARGET),

  update: (id, payload) => api.put(`${TARGET}/${id}`),

  delete: (id) => api.delete(`${TARGET}/${id}`),
};