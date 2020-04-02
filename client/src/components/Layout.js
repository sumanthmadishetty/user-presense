import React, { useContext, useState } from 'react';
import { AppBar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { UserDataContext } from 'context/UserDataContext';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function Layout({ children }) {
  const { userData, handleLogout } = useContext(UserDataContext);

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

function TopbarMenu(props) {
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
      <Menu
        id="menu-appbar"
        getContentAnchorEl={null}
        // anchorEl={'anchorEl'}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={toggleMenu}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
