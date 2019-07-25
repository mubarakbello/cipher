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
  columnTransformation,
  inverseColumnTransformation
} = require('./column_transformer');
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
  const partialEncrypted = columnTransformation(caesarCipher, key, subkey2);
  const fullyEncrypted = columnTransformation(partialEncrypted, key, subkey2);
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
  let partialDecrypted = inverseColumnTransformation(encryptedText, key, subkey2);
  partialDecrypted = inverseColumnTransformation(partialDecrypted, key, subkey2);
  const fullyDecrypted = fromCaesarCipher(partialDecrypted, _inverse_map);
  return fullyDecrypted;
}
