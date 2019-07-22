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
  this.columnTransformation(this.cipher_text1);
}

Cipher.prototype.columnTransformation = function(text = "") {
  const str_array = text.match(new RegExp(`.{1,${this.key.length}}`, 'g'));
  // console.table(str_array);
  let new_str = [];
  const new_array = str_array.map((each_array, ind) => {
    let v = this.subkey2.map(key => each_array[key]);
    return v;
  });
  console.table(new_array);
}

cipher = new Cipher('enemy attacks tonight', "qwert");
cipher.encrypt();
