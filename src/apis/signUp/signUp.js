import instance from '../../lib/instance';

const URL = '/api/v1/salesorder'; 

const signUp = (data) => instance
  .post('/api/v1/auth/sign-up', data)
  .then((response) => response.data);

  export default signUp;