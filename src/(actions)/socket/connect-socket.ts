import { io, Socket } from "socket.io-client";

export const connectSocket = (userId: number) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_API + "/chat-gpt", {
    extraHeaders: {
      userId: userId.toString(),
    },
  });
  return socket;
};

export const disconnectSocket = (socket: Socket) => {
  socket.disconnect();
};
