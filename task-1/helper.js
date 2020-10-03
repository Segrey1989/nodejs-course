const fs = require('fs');

const { stderr } = process;

const messages = {
  success: fileName => `\n***The result is in ${fileName} file.***\n`,
  result: data => `\n***The result of action:***\n${data || ''}\n`,
  done: '\n\n***Encrypt is done***\n',
  pipelineError: 'The pipeline failed.\n',
  noRequreArgument: argumentName =>
    `${argumentName} is required.\nAbout to exit with code 9.\n`,
  noFileExist:
    "\n***\nInput or output files has been provided but don't exist.\nPlease check the correctness of file names.\n***\n\n"
};

const isFileNameProvided = fileName => typeof fileName === 'string';

const isFileExist = file => fs.existsSync(`${__dirname}/${file}`);

const checkProvidedOptions = (actionType, shiftValue) => {
  if (actionType !== 'encode' && actionType !== 'decode') {
    stderr.write(messages.noRequreArgument('Action type'));
    process.exit(9);
  }

  if (typeof shiftValue !== 'number') {
    stderr.write(messages.noRequreArgument('Shift'));
    process.exit(9);
  }
};

module.exports = {
  messages,
  isFileNameProvided,
  isFileExist,
  checkProvidedOptions
};
