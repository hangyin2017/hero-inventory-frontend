import instance from '../../lib/instance';

const URL = '/api/v1/dashboard'; 

export default {
  getAll: () => instance.get(URL),
};