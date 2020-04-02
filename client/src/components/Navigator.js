import React, { useContext } from 'react';
import { Router, Redirect, navigate } from '@reach/router';
import { Login, Register } from 'containers';
import { NotFound } from 'components';
import Home from 'containers/Home';
import { UserDataContext } from 'context/UserDataContext';
import Layout from './Layout';

export default function Navigator(props) {
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

function ProtectedRoute({ component: Component, path }) {
  const { isAuthenticated, displayFlash } = useContext(UserDataContext);
  if (isAuthenticated) {
    return <Component path="path" />;
  }
  return <Redirect from={path} to="/login" noThrow />;
}
