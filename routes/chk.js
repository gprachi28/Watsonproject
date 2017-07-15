const repeatChk = require('../patternMatching.js');
const fs = require('fs');
fs.writeFileSync('repetitions.txt');
repeatChk.stringRepeatCheck('../transcription.txt', '../repetitions.txt');
