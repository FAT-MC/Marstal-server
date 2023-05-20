const { Server } = require('socket.io');
const { postMessage, MessageEvent } = require('./chatMessageService');
const appConfig = require("../config");
const { verifyAuthToken } = require("../service/tokenService");

let io = null;

const configSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: appConfig.app.origin
    }
  });

  io.use(async (socket, next) => {
    try {
      const decoded = verifyAuthToken(socket.handshake.auth.token);
      socket.userId = decoded.userId;
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  });

  io.on('connection', (socket) => {
    const authToken = socket.handshake.auth.token;
    console.log(`New socket connection: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });

    socket.on("chat", async (messagePayload, errorHandler) => {
      const { chatId, message, audio } = messagePayload;

      if (chatId && message) {
        try {
          await postMessage(chatId, message, audio, (eventPayload) => {
            socket.emit('response', eventPayload)
          });
        } catch (error) {
          errorHandler({
            error: error.message
          })
        }
      }

      try {
        verifyAuthToken(authToken);
      } catch (error) {
        socket.disconnect();
      }
    })
  });


}

module.exports = {
  configSocket
}