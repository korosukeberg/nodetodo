import axiosbase from 'axios';

const axios = axiosbase.create({
  baseURL: 'http://localhost:3000'
});

export default axios;
