module.exports.generateMaps = (subkey1) => {
  let q = 0;
  const visited = {};
  const _map = {};
  const _inverse_map = {};

  for (let i = 0; i <= 255; i++) {
    if ((i >= 32) && (i <= 126)) {
      const {rand, q_next} = getNextRandom(q, visited);
      q = q_next;
      const v = rand;
      _map[i] = v;
      _inverse_map[v] = i;
    } else {
      _map[i] = i;
      _inverse_map[i] = i;
    }
  }

  return {
    map: _map,
    inverse: _inverse_map
  };
}


const getNextRandom = (q, visited) => {
  let randomValue = q % 127;
  q = randomValue + (3 * subkey1);

  if (randomValue < 32) randomValue = 32;

  if (!visited[randomValue]) {
    visited[randomValue] = true;
  } else {
    while (visited[randomValue]) {
      randomValue = (randomValue + 1) % 127;
      if (randomValue < 32) randomValue = 32;
    }
    visited[randomValue] = true;
  }

  return {rand: randomValue, q_next: q};
}
