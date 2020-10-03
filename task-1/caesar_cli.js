const fs = require('fs');

const Encoder = require('./Encoder');
const EncryptStream = require('./EncryptStream');
const {
  messages,
  isFileNameProvided,
  isFileExist,
  checkProvidedOptions,
  makePipeline
} = require('./helper');

const { argv } = require('yargs');
const { stdin, stdout, stderr } = process;
const { s, shift, a, action, i, input, o, output } = argv;

const inputFile = input || i;
const outputFile = output || o;
const shiftValue = shift || s;
const actionType = action || a;

// Files provided but don't exist (one of them or both)
if (
  (isFileNameProvided(inputFile) && !isFileExist(inputFile)) ||
  (isFileNameProvided(outputFile) && !isFileExist(outputFile))
) {
  stderr.write(messages.noFileExist);
  return;
}

// Check action and shift arguments
checkProvidedOptions(actionType, shiftValue);

const encoder = new Encoder(actionType, shiftValue);
const transformStream = new EncryptStream(actionType, shiftValue);

// There is no input file
if (!isFileNameProvided(inputFile)) {
  stdout.write('Please input the text you want to encode/decode:\n');

  stdin.on('readable', () => {
    const data = stdin.read();

    if (data) {
      const ecryptedData = encoder.encrypt(data);

      if (isFileNameProvided(outputFile)) {
        const writeableStream = fs.createWriteStream(
          `${__dirname}/${outputFile}`
        );
        writeableStream.write(ecryptedData);
        stdout.write(messages.success(outputFile));
      } else {
        stdout.write(messages.result(ecryptedData));
      }
    }
  });

  stdin.setEncoding('utf8');
  stdin.resume();

  return;
}

// There is no output file
if (!isFileNameProvided(outputFile)) {
  const readableStream = fs.createReadStream(
    `${__dirname}/${inputFile}`,
    'utf8'
  );
  stdout.write(messages.result());

  makePipeline(readableStream, transformStream, stdout);
  return;
}

// Both files are provided
const readableStream = fs.createReadStream(`${__dirname}/${inputFile}`, 'utf8');
const writeableStream = fs.createWriteStream(`${__dirname}/${outputFile}`);

makePipeline(readableStream, transformStream, writeableStream, outputFile);
