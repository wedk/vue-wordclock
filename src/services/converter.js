function convertString(str) {
  let bits = '';
  for (let i = 0; i < str.length; i++) {
    bits += str.charAt(i) === ' ' ? '0' : '1';
  }
  return bits;
}

export function toWordMask(strings, ...keys) {
  let bits = '';
  for (let i = 0; i < strings.length; i++) {
    if (keys.length > i) {
      if (keys[i] === true) {
        bits += convertString(strings[i]);
      } else {
        bits += ''.padEnd(strings[i].length, '0');
      }
    } else {
      bits += convertString(strings[i]);
    }
  }
  return bits.padEnd(11, '0');
}
