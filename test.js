'use strict';
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const repeatChk = require('./patternMatching.js');

module.exports.Work = function() {
  /*
  const speech_to_text = new SpeechToTextV1({
      username: 'a515ed5c-bcb7-4d62-90cf-6cc238c844aa',
      password: 'BoFJIyEVi0CI'
  });

  const params = {
      content_type: 'audio/flac',
      interim_results: true
  };

  const recognizeStream = speech_to_text.createRecognizeStream(params);
  console.log('HI');
  fs.createReadStream('./audio-file.flac').pipe(recognizeStream);

  recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

  recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

  fs.writeFileSync('repetitions.txt');
  fs.writeFileSync('hesitations.txt');
  const hesitations = fs.createWriteStream('hesitations.txt', {
      flags: 'r+',
      defaultEncoding: Buffer
  });
  hesitations.write('Start,Stop \n');
  let preHesitation = 0;
  ['results', 'data'].forEach(eventName => {
      recognizeStream.on(eventName, x => {
        if(eventName === 'results') {
            x.results[0].alternatives[0].timestamps.forEach(y => {
                if (y[0] === '%HESITATION' && y[1] !== preHesitation) {
                    preHesitation = y[1];
                    hesitations.write(y[1] + ',' + y[2] + '\n');
                }
            });
        } else if(eventName === 'data') {
            repeatChk.stringRepeatCheck(x, 'repetitions.txt');
        }
      });
  });*/
  console.log('success');
}
