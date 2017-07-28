const fs = require('fs');

module.exports.stringRepeatCheck = function(inputFile, file) {
  fs.writeFileSync(file);
  var data = fs.readFileSync(inputFile,{encoding: 'utf-8'});
  const repetitions = fs.createWriteStream(file, {
    flags: 'r+',
    defaultEncoding: Buffer
  });
    const string = data;
    const repeats= [];
    const splitText = string.split(' ');
    splitText.forEach((x,i) => {
      const check = splitText[i + 1];
      if(x === check){
          repeats.push(
            { repeatWord: x,
              index: i});
        repetitions.write(x + ',' + i + '\n');
      }
    });
  return repeats;
}
