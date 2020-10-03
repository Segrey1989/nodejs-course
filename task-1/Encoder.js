class Encoder {
  constructor(action, shift) {
    this.action = action;
    this.shift = shift;
  }

  static isLatinChar(code) {
    return (code > 64 && code < 91) || (code > 96 && code < 123);
  }

  static encodeSign(signCode, shift) {
    let character = String.fromCharCode(signCode);

    if (Encoder.isLatinChar(signCode)) {
      character = String.fromCharCode(signCode + shift);
    }

    return character;
  }

  static decodeSign(signCode, shift) {
    const characterCode = signCode - shift;

    if (Encoder.isLatinChar(characterCode)) {
      return String.fromCharCode(characterCode);
    }

    return String.fromCharCode(signCode);
  }

  encrypt(data) {
    const length = data.length;
    let result = '';
    const actionHandler =
      this.action === 'encode' ? Encoder.encodeSign : Encoder.decodeSign;

    for (let i = 0; i < length; i++) {
      const sign = data[i];
      const code = sign.charCodeAt(0);
      result += actionHandler(code, this.shift);
    }

    return result;
  }
}

module.exports = Encoder;
