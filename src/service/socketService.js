const { Server } = require('socket.io');
const openAIService = require("./openAIService");
const ttsService = require("./ttsService");

let io = null;

const configSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_APP_ORGIN
    }
  });

  io.on('connection', (socket) => {
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
    })
  });
}

module.exports = {
  configSocket
}