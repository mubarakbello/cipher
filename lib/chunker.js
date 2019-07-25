/**
 * Slice up the `string` into `size` sized substrings.
 *
 * @param {string} [string]
 * @param {number} [size]
 * @return {Array<string>} [chunks]
 */

module.exports.chunkString = (string, size) => {
  // Pad string up to make it equally divisible
  const padsize = (size - (string.length % size)) % size;
  string += Array(padsize + 1).join(' ');

  // Divide string into chunks now
  const numChunks = Math.ceil(string.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; i++, o += size) {
    chunks[i] = string.substr(o, size);
  }

  return chunks;
}


/**
 * Slice up the `string` in `size` sized substrings in a column.
 *
 * @param {string} [string]
 * @param {number} [size]
 * @return {Array<string>} [chunks]
 */

module.exports.inverseChunkString = (string, size) => {
  // Pad string up to make it equally divisible
  const padsize = (size - (string.length % size)) % size;
  string += Array(padsize + 1).join(' ');

  // Reverse chunk string now
  const chunks = []
  const chunk_size = string.length / size;
  for (let i = 0; i < chunk_size; i++) {
    const arr_chunk = []
    for (let j = 0; j < size; j++) {
      arr_chunk.push(string[i + size * j])
    }
    chunks.push(arr_chunk.join(''));
  }

  return chunks;
}
