import { Server, createServer } from 'http';
import { verifyJWT } from '../helpers/jwt';
import { findOrCreateVisitHistoryAndActivateUser } from '../controllers/user';
import {
  findAndActivateVisitHistoryForUser,
  deactiveUser,
  allActiveUsers,
} from '../models/VisitHistory/actions';

// import SocketIO from 'socket-io';

export default async function initializeSocket(server) {
  //   const socketIo = require('socket.io');
  try {
    var cookie = require('cookie');

    var io = require('socket.io').listen(server);
    io.use((socket, next) => {
      try {
        const { token } = cookie.parse(socket.request.headers.cookie);
        const { success, userDetails } = verifyJWT(token);
        if (success) {
          socket._userDetails = userDetails;
          next();
        }
      } catch (err) {
        next(new Error('Authentication error'));
      }
      //   if (socket.request.headers.cookie) return next();
    });
    io.on('connection', async function (socket) {
      console.log('Socket established for user', socket._userDetails);
      const { success } = await findAndActivateVisitHistoryForUser(
        socket._userDetails._id,
      );
      console.log(success, 'succ sockey');
      if (success) {
        await sendActiveUsersToClient(socket);
        await broadCastAllActiveUsers(socket);
      }
      socket.on('disconnect', async () => {
        const { success } = await deactiveUser(
          socket._userDetails._id,
        );
        console.log('discc', success);
        if (success) {
          await broadCastAllActiveUsers(socket);
          console.log(
            'Connection terminated for user',
            socket._userDetails,
          );
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function broadCastAllActiveUsers(socket) {
  try {
    const { success, activeUsers } = await allActiveUsers(
      socket._userDetails._id,
    );
    success && socket.broadcast.emit('newVisitor', activeUsers);
  } catch (err) {
    console.error(err);
  }
}

async function sendActiveUsersToClient(socket) {
  try {
    const { success, activeUsers } = await allActiveUsers(
      socket._userDetails._id,
    );
    success && socket.emit('newVisitor', activeUsers);
  } catch (err) {
    console.error(err);
  }
}
