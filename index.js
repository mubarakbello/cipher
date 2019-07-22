// plaintext: string e.g. "enemy attacks tonight"
// password (key): string e.g. "random-str"


function Cipher(plaintext = "", key = "") {
  this.text = plaintext;
  this.key = key;
  this.q = 0;
  this.mvisited = {};
}

Cipher.prototype.keyGenerator = function() {
  let k1 = Array.from(this.key).map(char => char.charCodeAt(0));
  this.subkey1 = k1.reduce((acc, value) => {
    return (acc * 10) + value
  }, 0);
  const arr = Array.from(this.key).map((val, ind) => ind);
  this.subkey2 = k1.reduce((acc, code) => {
    let a = (code % this.key.length);
    if (arr.includes(a)) arr.splice(arr.indexOf(a), 1);
    let return_arr;
    if (acc.includes(a)) {
      return_arr = [...acc, arr[0]]
      arr.shift();
    } else {
      return_arr = [...acc, a]
    }
    return return_arr;
  }, []);
}

Cipher.prototype.initialize = function() {
  if (!this.subkey1) this.keyGenerator();
  this._map = {};
  this._inverse_map = {};
  for (let i = 0; i <= 255; i++) {
    if ((i >= 32) && (i <= 126)) {
      const v = this.getNextRandom();
      this._map[i] = v;
      this._inverse_map[v] = i;
    }
    else {
      this._map[i] = i;
      this._inverse_map[i] = i;
    }
  }
}

Cipher.prototype.getNextRandom = function() {
  let random1 = this.q % 127;
  this.q = random1 + (3 * this.subkey1);
  if (random1 < 32) random1 = 32;
  if (!this.mvisited[random1]) {
    this.mvisited[random1] = true;
  }
  else {
    while (this.mvisited[random1]) {
      random1 = (random1 + 1) % 127;
      if (random1 < 32) random1 = 32;
    }
    this.mvisited[random1] = true;
  }
  return random1;
}

Cipher.prototype.encrypt = function() {
  if (!this._map) this.initialize();
  this.cipher_text1 = String.fromCharCode(...Array.from(this.text).map(char => this._map[char.charCodeAt(0)]));
  let cipher = this.columnTransformation(this.cipher_text1);
  cipher = this.columnTransformation(cipher);
  console.log(cipher);
}

const chunkString = (string = "", size = 5) => {

  // Pad string up to make it equally divisible
  const padsize = size - (string.length % size);
  string += Array(padsize + 1).join(' ');

  // Divide string into chunks now
  const numChunks = Math.ceil(string.length / size);
  const chunks = new Array(numChunks);
  for (let i=0, o=0; i < numChunks; i++, o+=size) {
    chunks[i] = string.substr(o, size);
  }

  return chunks;
}

Cipher.prototype.columnTransformation = function(text = "") {
  const str_array = chunkString(text, this.key.length);
  let new_str = [];
  const new_array = str_array.map((each_array, index) => {
    let v = this.subkey2.map(key => each_array[key]);
    v.forEach((char, ind) => new_str[index + (this.key.length * ind)] = char);
    return v;
  });
  return new_str.join('');
}

cipher = new Cipher('enemy attacks tonight', "qwert");
cipher.encrypt();
