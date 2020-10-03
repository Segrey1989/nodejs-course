const fs = require('fs');
const { pipeline } = require('stream');

const { stderr, stdout } = process;

const messages = {
  success: fileName => `\nThe result is in ${fileName} file.\n`,
  result: data => `\nThe result of action:\n${data || ''}\n`,
  pipelineError: 'The pipeline failed.\n',
  noRequreArgument: argumentName =>
    `${argumentName} is required.\nAbout to exit with code 1.\n`,
  noFileExist:
    "Input or output files has been provided but don't exist.\nPlease check the correctness of file names.\n"
};

const isFileNameProvided = fileName => typeof fileName === 'string';

const isFileExist = file => fs.existsSync(`${__dirname}/${file}`);

const checkProvidedOptions = (actionType, shiftValue) => {
  if (actionType !== 'encode' && actionType !== 'decode') {
    stderr.write(messages.noRequreArgument('Action type'));
    process.exit(1);
  }

  if (typeof shiftValue !== 'number') {
    stderr.write(messages.noRequreArgument('Shift'));
    process.exit(1);
  }
};

const makePipeline = (readStream, transformSteam, writeStream, ...options) => {
  const [outputFile] = options;

  pipeline(readStream, transformSteam, writeStream, err => {
    if (err) {
      stderr.write(messages.pipelineError);
    } else {
      stdout.write(messages.success(outputFile));
    }
  });
};

module.exports = {
  messages,
  isFileNameProvided,
  isFileExist,
  checkProvidedOptions,
  makePipeline
};
