module.exports.keysGenerator = (key) => {
  let key_indices = [];
  let charInASCIIArray = Array.from(key).map((char, index) => {
    key_indices.push(index);
    return char.charCodeAt(0)
  });

  subkey1 = charInASCIIArray.reduce((acc, value) => {
    return (acc * 10) + value
  }, 0);

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
