const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const getSynthesizedAudio = async (text) => {
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', name: 'en-US-Neural2-C' },
    // select the type of audio encoding
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: 0,
      speakingRate: 1
    },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  return response.audioContent;
}

module.exports = {
  getSynthesizedAudio
}