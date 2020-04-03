import React, { useState, useContext } from 'react';
import PageCenterWrapper from 'components/PageCenterWrapper';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { Link, navigate, Redirect } from '@reach/router';
import { registerUser } from 'actions/API';
import useInput from 'customHooks/useInput';
import { UserDataContext } from 'context/UserDataContext';
import useCaptcha from 'customHooks/useCaptcha';

Register.propTypes = {
  path: PropTypes.string.isRequired
};

export default function Register({ path }) {
  const [UserNameInput, username] = useInput({
    label: 'Username',
    helperText: 'Usename is case senstive'
  });
  const [PasswordInput, password] = useInput({
    label: 'Password',
    type: 'password'
  });
  const [ConfirmPassword, confirmPassword, , setErrorForConfirmPassword] = useInput({
    label: 'Confirm Password',
    type: 'password',
    callBackOnChange: handleChangeConfirmPassword
  });
  const [isValidating, setValidating] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { displayFlash, isAuthenticated } = useContext(UserDataContext);
  const [Captcha, isCaptchaValid] = useCaptcha();

  if (isAuthenticated) {
    return <Redirect from={path} to="/" noThrow />;
  }

  return (
    <PageCenterWrapper>
      <Typography variant="h5">Please Register here</Typography>
      <div className="loginInputsWrapper">
        <form onSubmit={handleSubmitForm}>
          {UserNameInput}
          {PasswordInput}
          {ConfirmPassword}
          {Captcha}
          <Button
            onClick={handleSubmitForm}
            disabled={
              !isCaptchaValid || (isSubmitting || !(password && username && confirmPassword))
            }
            type="submit"
            style={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
          >
            {isSubmitting ? <CircularProgress size={30} /> : 'Register'}
          </Button>
        </form>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login">Already Have a account? Click here to Login</Link>
      </div>
    </PageCenterWrapper>
  );

  function handleChangeConfirmPassword(value) {
    if (isValidating) {
      if (password === value) {
        setErrorForConfirmPassword('');
      }
    }
  }

  function handleSubmitForm(e) {
    setSubmitting(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorForConfirmPassword('Passwords doesnot match');
      setSubmitting(false);
      return setValidating(true);
    }

    return registerUser({ username, password }).then(({ success, data, error }) => {
      if (success) {
        displayFlash({ message: ' User created successfully, Please login to continue ' });
        return navigate('/login');
      }
      setSubmitting(false);
      return displayFlash({ message: error });
    });
  }
}
