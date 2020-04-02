import axios from 'axios';
import Cookies from 'js-cookie';

const LOGIN_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}user/login`;

export function login(apiParams) {
  return axios
    .post(LOGIN_ENDPOINT, apiParams)
    .then(({ status, data } = {}) => {
      if (status === 200 && data) {
        Cookies.set('token', data.token, { expires: 1 });
        return { success: true, data };
      }
      return { success: false };
    })
    .catch(({ response: { data = {} } = {} } = {}) => {
      return { success: false, error: data.error };
    });
}
