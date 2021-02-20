import instance from '../../lib/instance';
import { RESOURCE_TYPES } from '@/constants/resources';

const URL = '/api/v1/resources'; 

interface Resource {
  name: string,
  link: string,
  type: RESOURCE_TYPES,
}

export default {
  getAll: () => instance.get(URL),

  get: (id: number) => instance.get(`${URL}/${id}`),

  add: (payload: Resource) => instance.post(URL, payload),

  update: (id, payload) => instance.put(`${URL}/${id}`, payload),

  remove: (id) => instance.delete(`${URL}/${id}`),
};