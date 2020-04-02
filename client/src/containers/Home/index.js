import React, { useEffect, useState, useContext, useCallback } from 'react';
import { UserDataContext } from 'context/UserDataContext';
import initializeSocket from 'helpers/socket';
import ActiveUsers from './components/ActiveUsers';
import VisitedUsersList from './components/VisitedUsersList';

export default function Home() {
  const [data, setData] = useState([]);
  const { userData } = useContext(UserDataContext);

  const handleNewVisitor = useCallback(
    list => {
      const vistorData = list.filter(u => u.user._id !== userData._id);
      setData(vistorData.map(v => v.user));
    },
    [userData]
  );

  useEffect(() => {
    const socket = initializeSocket();
    socket.on('newVisitor', handleNewVisitor);
    return () => {
      socket.close();
    };
  }, [handleNewVisitor]);

  return (
    <div>
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
