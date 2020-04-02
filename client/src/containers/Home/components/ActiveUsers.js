import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Fab,
  Tooltip,
  Menu,
  IconButton,
  MenuItem,
  Typography
} from '@material-ui/core';

export default function ActiveUsers({ usersList }) {
  if (!(usersList && usersList.length)) {
    return (
      <div style={{ display: 'flex', marginLeft: 'auto', float: 'right', marginRight: '50px' }}>
        No Active users other than current user
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', marginLeft: 'auto', float: 'right', marginRight: '50px' }}>
      {usersList.slice(0, 3).map((user, index) => (
        <CustomFab key={user._id} name={user.username} index={index} />
      ))}
      <CustomFab1 extraUsers={usersList.slice(3)} />
    </div>
  );
}

function CustomFab1({ extraUsers }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  function toggleMenu(e) {
    setAnchorEl(e.currentTarget);
    setOpen(o => !o);
  }

  if (extraUsers && extraUsers.length) {
    return (
      <>
        <IconButton
          // className="customFab"
          style={{ padding: '0px' }}
          size="large"
          onClick={toggleMenu}
          color="inherit"
        >
          <div className="customFab" style={{ backgroundColor: '#188038' }}>
            <div>
              <Typography style={{ textTransform: 'uppercase' }}>{`+ ${
                extraUsers.length
              }`}</Typography>
            </div>
          </div>
        </IconButton>
        <Menu
          id="menu-appbar"
          getContentAnchorEl={null}
          anchorEl={anchorEl}
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
          {extraUsers.map((item, index) => {
            return (
              <MenuItem key={index}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <CustomFab key={item._id} name={item.username} index={index} />
                  <Typography style={{ marginLeft: '10px' }}>{item.username}</Typography>
                </div>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  }
  return null;
}

function CustomFab({ index, name = '' }) {
  const colors = ['#63782F', '#FEAB9E', '#B7DBF0', '#00A3BB', '#188038', '#DC077F'];

  return (
    <Tooltip placement="top" title={name}>
      <div className="customFab" style={{ backgroundColor: colors[index % colors.length] }}>
        <div>
          <h1 style={{ textTransform: 'uppercase' }}>{name[0]}</h1>
        </div>
      </div>
    </Tooltip>
  );
}
