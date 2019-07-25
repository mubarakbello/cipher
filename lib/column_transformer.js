/**
 * Module dependencies.
 * @private
 */

const { chunkString, inverseChunkString } = require('./chunker');


/**
 * Performs column transformation on `text` with the given `key` and `subkey2`.
 *
 * @param {string} [text]
 * @param {string} [key]
 * @param {Array<number>} [subkey2]
 * @return {string} which is the transformed string
 */

module.exports.columnTransformation = (text, key, subkey2) => {
  const str_array = chunkString(text, key.length);
  let new_str = [];
  str_array.forEach((each_array, index) => {
    let v = subkey2.map(key => each_array[key]);
    v.forEach((char, ind) => new_str[index + (str_array.length * ind)] = char);
  });
  return new_str.join('');
}


/**
 * Performs inverse column transformation on `text`
 * with the given `key` and `subkey2`.
 *
 * @param {string} [text]
 * @param {string} [key]
 * @param {Array<number>} [subkey2]
 * @return {string} which is the transformed string
 */

module.exports.inverseColumnTransformation = (text, key, subkey2) => {
  const str_array = inverseChunkString(text, key.length);
  let new_str = [];
  str_array.forEach((each_array, index) => {
    let v = [];
    subkey2.forEach((key, ind) => v[key] = each_array[ind]);
    v.forEach((char, ind) => new_str[ind + (key.length * index)] = char);
  });
  return new_str.join('');
}
