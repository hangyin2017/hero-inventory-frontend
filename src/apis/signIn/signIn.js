import instance from '../../lib/instance';

const signIn = (data) => instance
  .post('authentication/sign-in', data)
  .then((response) => response.data);

  export default signIn;