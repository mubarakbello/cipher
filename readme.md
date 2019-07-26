# Cipher

An implementation of Caesar cipher and transposition cipher.
The algorithm is deduced from the following source:
[Enhancing the Security of Caesar Cipher Substitution
Method using a Randomized Approach for more Secure
Communication](https://arxiv.org/pdf/1512.05483.pdf)

## Usage

```js
var { encrypt, decrypt } = require('./cipher');

const t = encrypt("enemy attacks tonight", "qwertn");
console.log(t);

const r = decrypt(t, "qwertn");
console.log(r); // => enemy attacks tonight
```
