import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Link, navigate, Redirect } from '@reach/router';
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
    label: 'Username'
  });
  const [PasswordInput, password] = useInput({
    label: 'Password',
    type: 'password'
  });
  const { displayFlash, handleUserLogin, isAuthenticated } = useContext(UserDataContext);

  if (isAuthenticated) {
    return <Redirect from={path} to="/" noThrow />;
  }

  return (
    <PageCenterWrapper>
      <span>Please login to continue...</span>
      <div className="loginInputsWrapper">
        <form onSubmit={handleLogin}>
          {UserNameInput}
          {PasswordInput}
          <Button
            disabled={!(password && username)}
            type="submit"
            style={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
          >
            Signin
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
    login({ username, password }).then(({ success, data, error }) => {
      if (success) {
        localStorage.setItem('token', data.token);
        handleUserLogin(data.user);
        return navigate('/');
      }
      displayFlash({ message: error });
    });
  }
}
