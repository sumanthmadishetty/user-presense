/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';
import { renderToast } from 'helpers/toast';

const REGISTER_END_POINT = `${process.env.REACT_APP_SERVER_URL}user/register`;

export function registerUser(apiParams) {
  renderToast();
  return axios
    .post(REGISTER_END_POINT, apiParams)
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
