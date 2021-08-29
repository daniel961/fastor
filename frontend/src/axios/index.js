import axios from 'axios';
import Cookies from 'universal-cookie';

const instanceConfig = {
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
};

const http = axios.create(instanceConfig);

http.interceptors.request.use(
  function (config) {
    const cookies = new Cookies();

    const token = cookies.get('token');

    config.headers['Authorization'] = `Bearer ${token}` || '';
    config.headers.Accept = 'application/json';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default http;
