# Cipher

An implementation of Caesar cipher and transformation cipher

## Usage

```js
var { encrypt, decrypt } = require('./cipher');

const t = encrypt("enemy attacks tonight", "qwertn");
console.log(t);

const r = decrypt(t, "qwertn");
console.log(r); // => enemy attacks tonight
```
