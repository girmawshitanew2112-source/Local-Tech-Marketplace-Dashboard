import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (userId, onNotification) => {
  useEffect(() => {
    if (!userId) return undefined;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.emit('user:join', userId);
    socket.on('notification:new', onNotification);
    return () => socket.disconnect();
  }, [userId, onNotification]);
};
