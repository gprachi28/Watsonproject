const fs = require('fs');

module.exports.stringRepeatCheck = function(inputFile, file) {
  fs.writeFileSync(file);
  var data = fs.readFileSync(inputFile,{encoding: 'utf-8'});
  const repetitions = fs.createWriteStream(file, {
    flags: 'r+',
    defaultEncoding: Buffer
  });
    const string = data;
    const words = [];
    const index = []
    const splitText = string.split(' ');
    splitText.forEach((x,i) => {
      const check = splitText[i + 1];
      if(x === check){
        words.push(x.toString());
        index.push(i);
        repetitions.write(x + ',' + i + '\n');
      }
    });
  return [words, index];
}
