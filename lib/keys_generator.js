/**
 * Generate two subkeys `subkey1` and `subkey2` from the given `key`.
 *
 * @param {string} [key]
 * @return {Array} [subkey1, subkey2]
 */

module.exports.keysGenerator = (key) => {
  let key_indices = [];

  // Obtain the ASCII value of each character, and an array of the indices
  let charInASCIIArray = Array.from(key).map((char, index) => {
    key_indices.push(index);
    return char.charCodeAt(0)
  });

  // Calculate `subkey1` from the ASCII values array
  subkey1 = charInASCIIArray.reduce((acc, value) => {
    return (acc * 10) + value
  }, 0);

  // Calculate subkey2 array
  subkey2 = charInASCIIArray.reduce((acc, value) => {
    let a = (value % key.length);
    if (key_indices.includes(a)) key_indices.splice(key_indices.indexOf(a), 1);
    let returnArr;
    if (acc.includes(a)) {
      returnArr = [...acc, key_indices[0]]
      key_indices.shift();
    } else {
      returnArr = [...acc, a]
    }
    return returnArr;
  }, []);

  return [subkey1, subkey2];
}
