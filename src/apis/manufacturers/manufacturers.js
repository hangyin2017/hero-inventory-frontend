import instance from '../../lib/instance';

const URL = '/manufacturers'; 

export default {
  getAll: () => instance.get(URL),

  add: (payload) => instance.post(URL, payload),

  update: (id, payload) => instance.put(`${URL}/${id}`, payload),

  remove: (id) => instance.delete(`${URL}/${id}`),
};