var express = require('express');
var router = express.Router();
var path = require('path');
//var Func = require('../test.js');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
const repeatChk = require('../patternMatching.js');


//multer object creation
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
    var hope = file.originalname;
    cb(null, file.originalname);
    }
 });

 var speech_to_text = new SpeechToTextV1({
     username: 'a515ed5c-bcb7-4d62-90cf-6cc238c844aa',
     password: 'BoFJIyEVi0CI'
 });

 var params = {
     content_type: 'audio/flac',
     interim_results: true
 };
const recognizeStream = speech_to_text.createRecognizeStream(params);

router.get('/', function(req, res, next){
  res.render('index', {trans: '',  hesi: '', rep: '', repeatInd: '', repeatWords: ['a','b']})
});

router.post('/', multer({storage: storage}).single('audioupload'),function(req, res) {
    fs.createReadStream('./uploads/'+ req.file.originalname).pipe(recognizeStream);
    recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
    fs.createWriteStream('transcription.txt');
    recognizeStream.setEncoding('utf8');
    fs.writeFileSync('hesitations.txt');
    const hesitations = fs.createWriteStream('hesitations.txt', {
        flags: 'r+',
        defaultEncoding: Buffer
    });
    hesitations.write('Start,Stop \n');
    let preHesitation = 0;
    ['results', 'data', 'close'].forEach(eventName => {
        recognizeStream.on(eventName, x => {
            if(eventName === 'results') {
                x.results[0].alternatives[0].timestamps.forEach(y => {
                    if (y[0] === '%HESITATION' && y[1] !== preHesitation) {
                        preHesitation = y[1];
                        hesitations.write(y[1] + ',' + y[2] + '\n');
                    }
                });
            } else if (eventName === 'close'){
                if (x === 1000){
                    const result_transcript = fs.readFileSync('./transcription.txt', {encoding: 'utf-8'});    
                    const result_hesitation = fs.readFileSync('./hesitations.txt', {encoding: 'utf-8'});
                    const temp = repeatChk.stringRepeatCheck('./transcription.txt', 'repetitions.txt');
                    let words = temp[0];
                    const indicex = temp[1];
                    res.render('index',{trans: result_transcript,  hesi: result_hesitation, rep: indicex, repeatInd: indicex, repeatWords: words});  
                }
            }
        });
    });
});

module.exports = router;
