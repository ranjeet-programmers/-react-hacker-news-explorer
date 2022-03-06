import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.api.URL;

/**
 * Global request function for handling all HTTP calls
 * @param method
 * @param url
 * @param options {params: <for query params>, payload: <for data to be sent>'}
 */

const request = (method, url, options = {params: {}, payload: {}}) => {

  const request = {
    url,
    method,
    params: options.params,
    data: options.payload,
  };

  return new Promise((resolve, reject) => {
    axios.request(request)
        .then(res => resolve(res))
        .catch(err => reject(err))
  });
};

export const POST = (path, payload) => {
  return request('POST', path, {payload})
};

export const GET = (path, params) => {
  return request('GET', path, {params});
};

export const GETALL = (path, filters) => {
  return request('GET', path, {params: filters});
};

export const PUT = (path, payload) => {
  return request('PUT', path, {payload: payload});
};

export const PATCH = (path, payload) => {
  return request('PATCH', path, {payload: payload});
};

export const DELETE = (path) => {
  return request('DELETE', path);
};

axios.interceptors.request.use((request) => {
  return request;
});

/**
 * RESPONSE INTERCEPTOR
 */
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response.data;
}, (error) => {
  return Promise.reject(error.response);
});
