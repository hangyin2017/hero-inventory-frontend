import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP__API_HOST,
});

export default instance;