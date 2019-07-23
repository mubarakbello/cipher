const { chunkString, inverseChunkString } = require('./chunker');


module.exports.columnTransformation = (text, key, subkey2) => {
  const str_array = chunkString(text, key.length);
  let new_str = [];
  str_array.forEach((each_array, index) => {
    let v = subkey2.map(key => each_array[key]);
    v.forEach((char, ind) => new_str[index + (key.length * ind)] = char);
  });
  return new_str.join('');
}


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
