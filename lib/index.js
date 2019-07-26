'use strict';

/**
 * Module dependencies.
 */

const { keysGenerator } = require('./keys_generator');
const { generateMaps } = require('./maps_generator');
const {
  toCaesarCipher,
  fromCaesarCipher
} = require('./simple_caesar_cipher');
const {
  columnTransposition,
  inverseColumnTransposition
} = require('./column_transposer');
const { validator } = require('./validator');



/**
 * Encrypts `plaintext` with the given `key`.
 *
 * @param {string} [plainText]
 * @param {string} [key]
 * @return {string} encrypted string
 * @api public
 */

module.exports.encrypt = (plainText, key) => {
  validator(plainText, key);
  const [ subkey1, subkey2 ] = keysGenerator(key);
  const { map: _map } = generateMaps(subkey1);
  const caesarCipher = toCaesarCipher(plainText, _map);
  const partialEncrypted = columnTransposition(caesarCipher, key, subkey2);
  const fullyEncrypted = columnTransposition(partialEncrypted, key, subkey2);
  return fullyEncrypted;
}


/**
 * Decrypts `encryptedText` with the given `key`.
 *
 * @param {string} [encryptedText]
 * @param {string} [key]
 * @return {string} decrypted string
 * @api public
 */

module.exports.decrypt = (encryptedText, key) => {
  validator(encryptedText, key);
  const [ subkey1, subkey2 ] = keysGenerator(key);
  const { inverse: _inverse_map } = generateMaps(subkey1);
  let partialDecrypted = inverseColumnTransposition(encryptedText, key, subkey2);
  partialDecrypted = inverseColumnTransposition(partialDecrypted, key, subkey2);
  const fullyDecrypted = fromCaesarCipher(partialDecrypted, _inverse_map);
  return fullyDecrypted;
}
