const { createMessage, getMessagesByChatId } = require('../repository/chatMessageRepository');
const { getChatById } = require('../repository/chatRepository');
const openAIService = require("./openAIService");
const ttsService = require("./ttsService");


const postMessage = async (chatId, message, audioEnabled = false) => {
  if (!chatId) {
    throw new Error("Invalid Chat Id");
  }

  if (!message) {
    throw new Error("Invalid Message");
  }

  // make sure the chat exists
  const chat = await getChatById(chatId);
  const chatMessages = await getMessagesByChatId(chatId);
  const chatContext = chatMessages.map((chatMessage) => ({ role: chatMessage.role, content: chatMessage.content }))

  const aiTextResponse = await openAIService.getAIResponse(chatContext, message);
  let result = {
    response: {
      text: aiTextResponse
    }
  }

  if (audioEnabled) {
    const aiAudioResponse = await ttsService.getSynthesizedAudio(aiTextResponse);
    result.response.audio = aiAudioResponse;
  }

  // save the message and responses
  await createMessage("user", message, chatId);
  await createMessage("assistant", aiTextResponse, chatId);

  return result;
}

const retriveChatMessages = async (chatId) => {
  if (!chatId) {
    throw new Error("Invalid Chat Id");
  }

  return await getMessagesByChatId(chatId);
}

module.exports = {
  postMessage,
  retriveChatMessages
}