import React, { useContext, useState } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { Link, Redirect } from '@reach/router';
import PageCenterWrapper from 'components/PageCenterWrapper';
import useInput from 'customHooks/useInput';
import { UserDataContext } from 'context/UserDataContext';
import { login } from 'actions/API';
import PropTypes from 'prop-types';

Login.propTypes = {
  path: PropTypes.string.isRequired
};

export default function Login({ path }) {
  // const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [UserNameInput, username] = useInput({
    label: 'Username',
    helperText: 'Usename is case senstive'
  });
  const [PasswordInput, password] = useInput({
    label: 'Password',
    type: 'password'
  });
  const { displayFlash, handleUserLogin, isAuthenticated } = useContext(UserDataContext);
  const [isSubmitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Redirect from={path} to="/" noThrow />;
  }

  return (
    <PageCenterWrapper>
      <Typography variant="h5">Please login to continue...</Typography>
      <div className="loginInputsWrapper">
        <form onSubmit={handleLogin}>
          {UserNameInput}
          {PasswordInput}
          <Button
            disabled={isSubmitting || !(password && username)}
            type="submit"
            style={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
          >
            {isSubmitting ? <CircularProgress size={30} /> : 'Signin'}
          </Button>
        </form>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link to="/register">Not registerd yet? Click here to register</Link>
      </div>
    </PageCenterWrapper>
  );

  function handleLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    login({ username, password }).then(({ success, data, error }) => {
      if (success) {
        localStorage.setItem('token', data.token);
        return handleUserLogin(data.user);
      }
      setSubmitting(false);
      displayFlash({ message: error });
    });
  }
}
