import React, { useContext, useState } from 'react';
import { AppBar, Typography, IconButton, MenuItem } from '@material-ui/core';
import { UserDataContext } from 'context/UserDataContext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import MenuList from './MenuList';

const GITHUB_SOURCE = 'https://github.com/sumanthmadishetty/user-presense';
const PORTFOLIO_LINK = 'https://sumanth.tech';

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
  const [anchorEl, setAnchorEl] = useState();

  function toggleMenu(e) {
    setAnchorEl(e.currentTarget);
    setOpen(o => !o);
  }
  return (
    <>
      <IconButton size="medium" onClick={toggleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <MenuList anchorEl={anchorEl} open={open} toggleMenu={toggleMenu}>
        <MenuItem>
          <a className="noTextDec" href={GITHUB_SOURCE} rel="noopener noreferrer" target="_blank">
            <Typography variant="subtitle2" color="secondary">
              Source @ Github
            </Typography>
          </a>
        </MenuItem>
        <MenuItem target="_blank">
          <a className="noTextDec" href={PORTFOLIO_LINK} rel="noopener noreferrer" target="_blank">
            <Typography variant="subtitle2" color="secondary">
              sumanth.tech
            </Typography>
          </a>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="subtitle1" color="primary">
            Logout
          </Typography>
        </MenuItem>
      </MenuList>
    </>
  );
}
