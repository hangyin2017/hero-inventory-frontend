import api from '../../lib/api';

const URL = '/manufacturers'; 

export default {
  getAll: () => api.get(URL),

  add: (payload) => api.post(URL, payload),

  update: (id, payload) => api.put(`${URL}/${id}`, payload),

  delete: (id) => api.delete(`${URL}/${id}`),
};