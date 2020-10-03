const stream = require('stream');
const Encoder = require('./Encoder');

class EncryptStream extends stream.Transform {
  constructor(actionType, shiftValue, options = {}) {
    options = Object.assign({}, options, { decodeStrings: false });
    super(options);
    this.actionType = actionType;
    this.shiftValue = shiftValue;
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));
      return callback();
    }
    const encoder = new Encoder(this.actionType, this.shiftValue);
    this.push(encoder.encrypt(chunk));
    callback();
  }
}

module.exports = EncryptStream;
