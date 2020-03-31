import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { fetchUserDetails } from './actions';

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchUserDetails().then(data => {
      if (data.success) {
        return setData(data.data);
      }
      alert('api failed');
    });
  }, []);
  return (
    <>
      <div>this is home page</div>
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Username</TableCell>
        </TableHead>
        <TableBody>
          {data.map(user => {
            return (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
