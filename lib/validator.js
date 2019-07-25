/**
 * Validation module for encryption and decryption.
 *
 * @param {string} [text]
 * @param {string} [key]
 */

module.exports.validator = (text, key) => {
  if ((typeof text !== "string") || (typeof key !== "string")) {
    throw Error("Text and key must be strings");
  }
  if (text.length < 1) {
    throw Error("Text to encrypt or decrypt must not be empty");
  }
  if (key.length < 1) {
    throw Error("Key to use for encryption or decryption must not be empty");
  }
}
