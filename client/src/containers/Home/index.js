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
import socketIOClient from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchUserDetails } from './actions';
import { UserDataContext } from 'context/UserDataContext';
import ActiveUsers from './components/ActiveUsers';
import VisitedUsersList from './components/VisitedUsersList';

const mockData = new Array(20).fill('12').map((d, i) => ({ _id: i, username: `User - ${i}` }));

export default function Home() {
  const [data, setData] = useState([]);
  const { userData } = useContext(UserDataContext);
  const token = Cookies.get('token');

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SERVER_URL, {
      transports: ['websocket'],
      query: { token }
    });
    socket.on('newVisitor', handleNewVisitor);
    return () => {
      console.log('unmounting');
      socket.disconnect();
    };
  }, []);

  function handleNewVisitor(list) {
    const vistorData = list.filter(u => u.user._id !== userData._id);
    setData(vistorData.map(v => v.user));
  }

  return (
    <div id="asd">
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #E8EAED',
          padding: '10px',
          paddingRight: '0px'
        }}
      >
        <ActiveUsers usersList={data} />
      </div>
      <VisitedUsersList activeUsers={data} />
    </div>
  );
}

// #63782F, #FEAB9E, #B7DBF0 #00A3BB #188038
