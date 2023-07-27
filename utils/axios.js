// utils/axios.js

import axios from 'axios';
import { useState } from 'react';
import Spinner from '../components/Spinner';

const instance = axios.create();

export const useAxios = () => {
  const [loading, setLoading] = useState(false);

  instance.interceptors.request.use(function (config) {
    setLoading(true);
    return config;
  }, function (error) {
    setLoading(false);
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    setLoading(false);
    return response;
  }, function (error) {
    setLoading(false);
    return Promise.reject(error);
  });

  return [instance, loading ? <Spinner /> : null];
};

export default instance;
