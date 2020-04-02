import React from 'react';
import { Container, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

PageCenterWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

PageCenterWrapper.defaultProps = {
  children: []
};

export default function PageCenterWrapper({ children }) {
  return (
    <div style={{ height: '100%' }}>
      <div
        style={{ height: '100%', display: 'flex', alignContent: 'center', alignItems: 'center' }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            style={{
              padding: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {children}
          </Paper>
        </Container>
      </div>
    </div>
  );
}
