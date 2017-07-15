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
    filename: function (req, file, cb) {
      //cb(null, file.originalname + Date.now() + '.' + mime.extension(file.mimetype));
      //console.log(file)
    //  cb(null,Date.now() + '-' + path.extension(file.originalname));

      //crypto.pseudoRandomBytes(16, function (err, raw) {
      //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      //cb(null, raw.toString('hex') + path.extname(file.originalname))
    //});
    var hope = file.originalname;
    cb(null, file.originalname)

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //Func.Work();
});

router.post('/', multer({storage: storage}).single('audioupload'),function(req, res) {
  res.send("File upload sucessfully.");
  fs.createReadStream('./uploads/'+ req.file.originalname).pipe(recognizeStream);
  recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
  fs.createWriteStream('transcription.txt');
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
        }
      });
  });
  repeatChk.stringRepeatCheck('../transcription.txt', 'repetitions.txt');
  var filenames = req.file.map(function(file) {
  return file.filename; // or file.originalname
});

});

module.exports = router;
