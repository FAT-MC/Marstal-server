const { Server } = require('socket.io');
const openAIService = require("./openAIService");
const ttsService = require("./ttsService");
const appConfig = require("../config");
const { verifyAuthToken } = require("../utils/helpers");

let io = null;

const configSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: appConfig.app.origin
    }
  });

  io.use(async (socket, next) => {
    try {
      verifyAuthToken(socket.handshake.auth.token);
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

    socket.on("chat", async (message) => {
      if (message) {
        const aiResponse = await openAIService.getAIResponse(message);
        const aiAudioResponse = await ttsService.getSynthesizedAudio(aiResponse);
        io.emit("response", { audioData: aiAudioResponse })
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