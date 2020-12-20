import instance from '../../lib/instance';

const URL = '/dashboard'; 

export default {
  getAll: () => instance.get(URL),
};