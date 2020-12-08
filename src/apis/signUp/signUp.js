import instance from '../../lib/instance';

const signUp = (data) => instance
  .post('authentication/sign-up', data)
  .then((response) => response.data);

  export default signUp;