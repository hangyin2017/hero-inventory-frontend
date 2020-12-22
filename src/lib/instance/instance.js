import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP__API_HOST,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem('TOKEN');

  if (token) {
    request.headers['authorization'] = token;
  }
  return request;
});

instance.interceptors.response.use((response) => {
  const token = response.headers['authorization'];
  if(token){
    localStorage.setItem('TOKEN', token);
  };
  return response;
})

export default instance;