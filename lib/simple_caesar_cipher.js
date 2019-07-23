module.exports.toCaesarCipher = (plainText, _map) => {
  return String.fromCharCode(
    ...Array.from(plainText).map(char => {
      return _map[char.charCodeAt(0)]
    })
  );
}


module.exports.fromCaesarCipher = (cipheredText, _inverse_map) => {
  return String.fromCharCode(
    ...Array.from(cipheredText).map(char => {
      return _inverse_map[char.charCodeAt(0)]
    })
  );
}
