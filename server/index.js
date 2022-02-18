require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const app = express();

// google cloud TTS API
// Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech');

// // Import other required libraries
// const fs = require('fs');
// const util = require('util');
// // Creates a client
// const client = new textToSpeech.TextToSpeechClient();
// async function quickStart() {
//   // The text to synthesize
//   const text = 'hello, world. what the fuck is up!';

//   // Construct the request
//   const request = {
//     input: { text: text },
//     // Select the language and SSML voice gender (optional)
//     voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//     // select the type of audio encoding
//     audioConfig: { audioEncoding: 'MP3' }
//   };

//   // Performs the text-to-speech request
//   const [response] = await client.synthesizeSpeech(request);
//   // Write the binary audio content to a local file
//   const writeFile = util.promisify(fs.writeFile);
//   await writeFile('output.mp3', response.audioContent, 'binary');
//   console.log('Audio content written to file: output.mp3');
// }
// quickStart();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
