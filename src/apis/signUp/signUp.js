import axios from 'axios';

const signUp = (data) => axios
  .post('http://localhost:8000/authentication/sign-up', data)
  .then((response) => response.data);

  export default signUp;