import React from 'react';
// import Login from './Login';

// module.exports = {
//   Login: React.lazy(() => import('../containers/Login')),
//   Register: React.lazy(() => import('../containers/Register'))
// };

export const Login = React.lazy(() => import('../containers/Login'));
export const Register = React.lazy(() => import('../containers/Register'));
export const Home = React.lazy(() => import('../containers/Home'));

// export default {
//   Login: Login),
//   Register: React.lazy(() => import('../containers/Register'))
// };
