import React from 'react';
import { TextField, Container, Paper, Button } from '@material-ui/core';
import { Link, navigate } from '@reach/router';
import PageCenterWrapper from 'components/PageCenterWrapper';
import { useState } from 'react';
import { login } from './actions';

export default function Login() {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
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
          label="Username"
          style={{ marginBottom: '10px' }}
        />
        <TextField onChange={onChangeFormValues} label="Password" id="password" type="password" />
        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          onClick={handleLogin}
          variant="contained"
          color="primary"
        >
          Signin
        </Button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link to="/register">Click here to register</Link>
      </div>
    </PageCenterWrapper>
  );

  function onChangeFormValues({ target: { value, id } }) {
    setFormValues(fv => ({ ...fv, [id]: value }));
  }

  function handleLogin() {
    if (formValues.username && formValues.password) {
      login(formValues).then(({ success, data, error }) => {
        if (success) {
          alert('loggedin');
          return navigate('/home');
        }
        alert(error);
      });
    }
  }
}

// .col-sm-12 .col-md-6 .offset-md-3
