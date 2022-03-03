import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT_URL;
import { getToken } from './authService';

const Api = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }
});


// Add a request interceptor
axios.interceptors.request.use(config => {
  const token = getToken();
  
  if (!token) {
    return config;
  }

  config.headers['authtoken'] = token;

  return config;
});

window.ax = axios;
window.api = Api;

export default Api;