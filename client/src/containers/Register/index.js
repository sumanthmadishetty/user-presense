import React, { useState } from 'react';
import PageCenterWrapper from 'components/PageCenterWrapper';
import { TextField, Button } from '@material-ui/core';
import { Link, navigate } from '@reach/router';
import { registerUser } from './actions';

const INTIAL_VALUES = {
  username: '',
  password: '',
  confirmPassword: ''
};

export default function Register() {
  const [formValues, setFormValues] = useState(INTIAL_VALUES);
  const [showFeedbackFor, setFeedbackFor] = useState('');

  return (
    <PageCenterWrapper>
      <span>Please login to continue...</span>
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '250px',
          justifyContent: 'center'
        }}
      >
        <TextField
          onChange={onChangeFormValues}
          id="username"
          // error={feedbackValues.username}
          label="Username"
          style={{ marginBottom: '10px' }}
          // helperText={feedbackValues.username}
        />
        <TextField
          onChange={onChangeFormValues}
          error={showFeedbackFor === 'password'}
          id="password"
          label="Password"
          type="password"
          helperText={
            showFeedbackFor === 'password' ? 'Password And confirmpassword should match' : ''
          }
        />
        <TextField
          onChange={onChangeFormValues}
          error={showFeedbackFor === 'password'}
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          helperText={
            showFeedbackFor === 'password' ? 'Password And confirmpassword should match' : ''
          }
        />
        <Button
          onClick={handleSubmitForm}
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login">Click here to Login</Link>
      </div>
    </PageCenterWrapper>
  );

  function onChangeFormValues({ target: { value, id } }) {
    setFormValues(fv => ({ ...fv, [id]: value }));
  }

  function handleSubmitForm() {
    if (formValues.password !== formValues.confirmPassword) {
      return setFeedbackFor('password');
    }
    registerUser(formValues).then(({ success, data }) => {
      if (success) {
        alert('User created Please login to continue');
        navigate('/login');
      }
    });
  }
}
