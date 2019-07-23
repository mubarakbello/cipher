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


module.exports.encrypt = (plainText, key) => {
  const [ subkey1, subkey2 ] = keysGenerator(key);
  const { map: _map } = generateMaps(subkey1);
  const caesarCipher = toCaesarCipher(plainText, _map);
  const partialEncrypted = columnTransformation(caesarCipher, key, subkey2);
  const fullyEncrypted = columnTransformation(partialEncrypted, key, subkey2);
  return fullyEncrypted;
}


module.exports.decrypt = (encryptedText, key) => {
  const [ subkey1, subkey2 ] = keysGenerator(key);
  const { inverse: _inverse_map } = generateMaps(subkey1);
  let partialDecrypted = inverseColumnTransformation(encryptedText, key, subkey2);
  partialDecrypted = inverseColumnTransformation(partialDecrypted, key, subkey2);
  const fullyDecrypted = fromCaesarCipher(partialDecrypted, _inverse_map);
  return fullyDecrypted;
}
