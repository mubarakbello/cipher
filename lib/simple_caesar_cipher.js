/**
 * Performs simple caesar cipher transformation on `plainText` with the given `_map`.
 *
 * @param {string} [plainText]
 * @param {Object} [_map]
 * @return {string} which is the transformed string
 */

module.exports.toCaesarCipher = (plainText, _map) => {
  return String.fromCharCode(
    ...Array.from(plainText).map(char => {
      return _map[char.charCodeAt(0)]
    })
  );
}


/**
 * Performs inverse caesar cipher transformation on `cipheredText` with the given `_inverse_map`.
 *
 * @param {string} [cipheredText]
 * @param {Object} [_inverse_map]
 * @return {string} which is the transformed string
 */

module.exports.fromCaesarCipher = (cipheredText, _inverse_map) => {
  return String.fromCharCode(
    ...Array.from(cipheredText).map(char => {
      return _inverse_map[char.charCodeAt(0)]
    })
  );
}
