import instance from '../../lib/instance';

const URL = '/api/v1/items'; 

export default {
  getAll: () => instance.get(URL),

  filter: (searchInput: string) => instance.get(`${URL}/filter`, {
    params: {
      searchInput,
    }
  }),

  get: (id: number) => instance.get(`${URL}/${id}`),

  add: (payload: string) => instance.post(URL, payload),

  update: (id: number, payload: string) => instance.put(`${URL}/${id}`, payload),

  remove: (id: number) => instance.delete(`${URL}/${id}`),
};