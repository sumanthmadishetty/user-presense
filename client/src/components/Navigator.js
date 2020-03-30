import React from 'react';
import { Router } from '@reach/router';
import { Login, Register } from 'containers';
import { NotFound } from 'components';

export default function Navigator(props) {
  return (
    <Router>
      <Login path="/login" />
      <Register path="/register" />
      <NotFound default />
    </Router>
  );
}
