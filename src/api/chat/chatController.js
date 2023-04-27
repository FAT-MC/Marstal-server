const {
  ttsService,
  openAIService
} = require("../../service");

const chatWithMessage = async (req, res) => {
  const message = req.body.message;
  const aiResponse = await openAIService.getAIResponse(message);
  const aiAudioResponse = await ttsService.getSynthesizedAudio(aiResponse);
  res.status(201).json({ audioData: aiAudioResponse });
}

module.exports = {
  chatWithMessage
}