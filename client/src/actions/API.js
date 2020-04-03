import axios from 'axios';

const VERIFY = `auth/verify`;
const VISIT_HISTORY = `visit-histories`;
const REGISTER_END_POINT = `auth/register`;
const LOGIN_ENDPOINT = `auth/login`;
const USERS_LIST = `users`;

const AxiosConfig = (auth = true) => {
  return {
    ...(auth && { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
    baseURL: process.env.REACT_APP_SERVER_URL
  };
};

export function verifyUser() {
  return axios
    .get(VERIFY, AxiosConfig())
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {}, request } = {}) => {
      if (data && data.error) {
        return { success: false, error: data.error };
      }
      return { success: false, error: 'Internal Server Error Occured' };
    });
}

export function getVisitHistories() {
  return axios
    .get(VISIT_HISTORY, AxiosConfig())
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {}, request } = {}) => {
      if (data && data.error) {
        return { success: false, error: data.error };
      }
      return { success: false, error: 'Internal Server Error Occured' };
    });
}

export function registerUser(apiParams) {
  return axios
    .post(REGISTER_END_POINT, apiParams, AxiosConfig(false))
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {}, request } = {}) => {
      if (data && data.error) {
        return { success: false, error: data.error };
      }
      return { success: false, error: 'Internal Server Error Occured' };
    });
}

export function login(apiParams) {
  return axios
    .post(LOGIN_ENDPOINT, apiParams, AxiosConfig(false))
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        localStorage.setItem('token', data.token);
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {}, request } = {}) => {
      if (data && data.error) {
        return { success: false, error: data.error };
      }
      return { success: false, error: 'Internal Server Error Occured' };
    });
}

export function fetchUserDetails() {
  return axios
    .get(USERS_LIST, AxiosConfig())
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {}, request } = {}) => {
      if (data && data.error) {
        return { success: false, error: data.error };
      }
      return { success: false, error: 'Internal Server Error Occured' };
    });
}
