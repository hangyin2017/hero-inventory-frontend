import axios from 'axios';

const localStorageToken = process.env.REACT_APP__LOCALSTORAGE_TOKEN_NAME;

const instance = axios.create({
  baseURL: process.env.REACT_APP__API_HOST,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem(localStorageToken);

  if (token) {
    request.headers['authorization'] = token;
  }
  return request;
});

instance.interceptors.response.use((response) => {
  const token = response.headers['authorization'];
  if(token){
    localStorage.setItem(localStorageToken, token);
  };
  return response;
})

export default instance;