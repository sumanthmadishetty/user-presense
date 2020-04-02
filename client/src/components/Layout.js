import React, { useContext, useState } from 'react';
import { AppBar, Typography, IconButton, MenuItem } from '@material-ui/core';
import { UserDataContext } from 'context/UserDataContext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import MenuList from './MenuList';

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

Layout.defaultProps = {
  children: []
};

export default function Layout({ children }) {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      <AppBar
        position="static"
        style={{ height: '50px', alignItems: 'center', marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
          <Typography>{`Welcome ${userData.username}`}</Typography>
          <TopbarMenu />
        </div>
      </AppBar>
      {children}
    </>
  );
}

function TopbarMenu() {
  const [open, setOpen] = useState(false);
  const { handleLogout } = useContext(UserDataContext);

  function toggleMenu() {
    setOpen(o => !o);
  }
  return (
    <>
      <IconButton size="medium" onClick={toggleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <MenuList open={open} toggleMenu={toggleMenu}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </>
  );
}
