import axios from 'axios';

const VERIFY = `${process.env.REACT_APP_SERVER_URL}user/verify`;
const VISIT_HISTORY = `${process.env.REACT_APP_SERVER_URL}visit-histories`;
const REGISTER_END_POINT = `${process.env.REACT_APP_SERVER_URL}user/register`;
const LOGIN_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}user/login`;
const USERS_LIST = `${process.env.REACT_APP_SERVER_URL}users`;

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

export function verifyUser() {
  return axios
    .get(VERIFY, { ...config })
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data.error };
    });
}

export function getVisitHistories() {
  return axios
    .get(VISIT_HISTORY, { ...config })
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data.error };
    });
}

export function registerUser(apiParams) {
  return axios
    .post(REGISTER_END_POINT, apiParams)
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data.error };
    });
}

export function login(apiParams) {
  return axios
    .post(LOGIN_ENDPOINT, apiParams)
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        localStorage.setItem('token', data.token);
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data.error };
    });
}

export function fetchUserDetails() {
  return axios
    .get(USERS_LIST, { ...config })
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data };
    });
}
