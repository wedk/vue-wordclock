import addHours from 'date-fns/add_hours';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';

import { toWordMask } from './converter.js';

const isH = (actualHours, validHours) =>
  actualHours === validHours || actualHours === validHours + 12;

// prettier-ignore
const MODEL = [
  ['ilnestodeux', h => toWordMask`il est ${true}deux${isH(h, 2)}`],
  ['quatretrois', h => toWordMask`quatre${isH(h, 4)}trois${isH(h, 3)}`],
  ['neufunesept', h => toWordMask`neuf${isH(h, 9)}une${isH(h, 1)}sept${isH(h, 7)}`],
  ['huitsixcinq', h => toWordMask`huit${isH(h, 8)}six${isH(h, 6)}cinq${isH(h, 5)}`],
  ['midixminuit', h => toWordMask`mi${h == 12}di${[10, 12, 22].includes(h)}x${isH(h, 10)}minuit${h == 0}`],
  ['onzerheures', h => toWordMask`onze${isH(h, 11)} heure${!isH(h, 0)}s${!isH(h, 0) && !isH(h, 1)}`],
  ['moinsoledix', (h, min) => toWordMask`moins${min > 30} le${min == 45}dix${[10, 50].includes(min)}`],
  ['etrquartpmd', (h, min) => toWordMask`et${min == 15} quart${[15, 45].includes(min)}`],
  ['vingt-cinqu', (h, min) => toWordMask`vingt${[20, 25, 35, 40].includes(min)}-${[25, 35].includes(min)}cinq${[5, 25, 35, 55].includes(min)}`],
  ['etsdemiepam', (h, min) => toWordMask`et demie${min == 30}`]
];

const LETTERS = MODEL.map(pair => pair[0]).join('');

function getDisplayTime(now) {
  // round minutes to nearest multiple of 5
  const minutes = 5 * Math.round(getMinutes(now) / 5);
  let hours;
  if (minutes > 30) {
    hours = getHours(addHours(now, 1));
  } else {
    hours = getHours(now);
  }
  return [hours, minutes];
}

export function getLetters() {
  return LETTERS;
}

export function getStatus(now) {
  const params = getDisplayTime(now);
  return MODEL.map(pair => pair[1].apply(null, params)).join('');
}

export function getLettersWithStatus(now) {
  const result = [];
  const status = getStatus(now);
  for (let i = 0; i < LETTERS.length; i++) {
    result.push([LETTERS[i], !!+status[i]]);
  }
  return result;
}
