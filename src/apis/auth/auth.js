import instance from '../../lib/instance';

const URL = '/api/v1/auth'; 

export default {
  // getAll: () => instance.get(URL),

  // filter: (searchInput) => instance.get(`${URL}/filter`, {
  //   params: {
  //     searchInput,
  //   }
  // }),

  get: () => instance.get(URL),

  signIn: (payload) => instance.post('/login', payload),

  signUp: (payload) => instance.post(`${URL}/sign_up`, payload),

  update: (id, payload) => instance.put(`${URL}/${id}`, payload),

  remove: (id) => instance.delete(`${URL}/${id}`),

  forgetPassword: (payload) => instance.post(`${URL}/forget_password`, payload),

  verifyEmail: (token) => instance.get(`${URL}/email_verification?token=${token}`),

  resetPassword: (payload, token) => instance.put(`${URL}/reset_password?token=${token}`, payload),
};