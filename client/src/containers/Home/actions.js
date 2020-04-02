/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';
import { renderToast } from 'helpers/toast';

const config = {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` }
};

const USERS_LIST = `${process.env.REACT_APP_SERVER_URL}users`;

export function fetchUserDetails() {
  //   renderToast();
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
