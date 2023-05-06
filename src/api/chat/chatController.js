const { body, validationResult } = require("express-validator");
const openAIService = require("../../service/openAIService");
const ttsService = require("../../service/ttsService");


const chatWithMessage = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const message = req.body.message;
  const aiResponse = await openAIService.getAIResponse(message);
  const aiAudioResponse = await ttsService.getSynthesizedAudio(aiResponse);
  res.status(201).json({ audioData: aiAudioResponse });
}

const validate = () => {
  return [
    body("message")
      .exists()
      .bail()
      .notEmpty()
      .bail()
      .withMessage("Error: Empty chat message")
      .isString()
      .bail()
      .withMessage("Error: Invalid chat message")
  ]
}

module.exports = {
  chatWithMessage,
  validate
}