import socketIOClient from 'socket.io-client';

export default function initializeSocket() {
  return socketIOClient(process.env.REACT_APP_SERVER_URL, {
    forceNew: true,
    reconnection: false,
    transports: ['websocket'],
    query: { token: localStorage.getItem('token') }
  });
}
