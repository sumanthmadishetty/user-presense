import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { Login, Register, Home } from 'containers';
import { NotFound } from 'components';
import { UserDataContext } from 'context/UserDataContext';
import PropTypes from 'prop-types';
import Layout from './Layout';

export default function Navigator() {
  return (
    <div className="navigator">
      <Router id="router">
        <Login path="/login" />
        <Register path="/register" />
        <Layout default>
          <ProtectedRoute component={Home} path="/" />
          <NotFound default />
        </Layout>
      </Router>
    </div>
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  path: PropTypes.string.isRequired
};

function ProtectedRoute({ component: Component, path }) {
  const { isAuthenticated } = useContext(UserDataContext);
  if (isAuthenticated) {
    return <Component path="path" />;
  }
  return <Redirect from={path} to="/login" noThrow />;
}
