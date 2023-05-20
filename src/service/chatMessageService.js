const { createMessage, getMessagesByChatId } = require('../repository/chatMessageRepository');
const { getChatById } = require('../repository/chatRepository');
const openAIService = require("./openAIService");
const ttsService = require("./ttsService");

const MessageEvent = {
  MESSAGE_RECEIVED: 'messageReceived',
  RESPONSE_GENERATED: 'responseGenerated',
  AUDIO_RESPONSE_GENERATED: 'audioResponseGenerated'
}

const postMessage = async (chatId, message, audioEnabled = false, eventUpdate) => {
  if (!chatId) {
    throw new Error("Invalid Chat Id");
  }

  if (!message) {
    throw new Error("Invalid Message");
  }

  const shouldUpdateEvent = eventUpdate && typeof eventUpdate === "function";

  // make sure the chat exists
  const chat = await getChatById(chatId);

  // save the user message
  const createdUserMessage = await createMessage("user", message, chatId);
  shouldUpdateEvent && eventUpdate({
    event: MessageEvent.MESSAGE_RECEIVED,
    payload: createdUserMessage
  })

  // get chat context for AI
  const chatMessages = await getMessagesByChatId(chatId);
  const chatContext = chatMessages.map((chatMessage) => ({ role: chatMessage.role, content: chatMessage.content }))
  const aiTextResponse = await openAIService.getAIResponse(chatContext, message);

  // save the assistant response
  const createdAssistantMessage = await createMessage("assistant", aiTextResponse, chatId);
  shouldUpdateEvent && eventUpdate({
    event: MessageEvent.RESPONSE_GENERATED,
    payload: createdAssistantMessage
  })

  let result = {
    response: {
      text: aiTextResponse
    }
  }

  if (audioEnabled) {
    const aiAudioResponse = await ttsService.getSynthesizedAudio(aiTextResponse);
    result.response.audio = aiAudioResponse;

    shouldUpdateEvent && eventUpdate({
      event: MessageEvent.AUDIO_RESPONSE_GENERATED,
      payload: aiAudioResponse
    })
  }

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
  retriveChatMessages,
  MessageEvent
}