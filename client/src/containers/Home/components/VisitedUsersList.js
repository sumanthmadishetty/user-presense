import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  Container,
  TableBody,
  TableRow,
  Typography
} from '@material-ui/core';
import { getVisitHistories } from 'actions/API';
import { UserDataContext } from 'context/UserDataContext';

export default function VisitedUsersList({ activeUsers }) {
  const [usersData, setusersData] = useState([]);
  const {
    displayFlash,
    userData: { _id: currentUserId }
  } = useContext(UserDataContext);
  useEffect(() => {
    getVisitHistories().then(({ success, data }) => {
      if (success) {
        return setusersData(data.data);
      }
      displayFlash({ message: 'Unable to fetch users list' });
    });
  }, [activeUsers, displayFlash]);

  function renderTableRow({ _id, user = {}, isActive, lastActive } = {}) {
    return (
      <TableRow key={_id}>
        <TableCell>
          <Typography>
            {user._id === currentUserId ? (
              <>
                <span style={{ marginRight: '10px' }}>{`${user.username}`}</span>
                <Typography variant="caption" color="primary">
                  (Its you)
                </Typography>
              </>
            ) : (
              `${user.username}`
            )}
          </Typography>{' '}
        </TableCell>
        <TableCell>
          <Typography color={isActive ? 'primary' : 'secondary'}>
            {isActive ? 'Active Now' : lastActive}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} variant="elevation" style={{ padding: '20px' }}>
        <Typography align="left" variant="h5" color="primary">
          Visited Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Last Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{usersData.map(renderTableRow)}</TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
