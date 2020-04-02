import React from 'react';
import { Menu } from '@material-ui/core';
import PropTypes from 'prop-types';

MenuList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  open: PropTypes.bool,
  toggleMenu: PropTypes.func
};

MenuList.defaultProps = {
  children: [],
  open: false,
  toggleMenu: () => {}
};

export default function MenuList({ children, open, toggleMenu, ...props }) {
  return (
    <Menu
      {...props}
      id="menu-appbar"
      getContentAnchorEl={null}
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
      {children}
    </Menu>
  );
}
