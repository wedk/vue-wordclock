import parse from 'date-fns/parse';

import {
  getLetters,
  getStatus,
  getLettersWithStatus
} from '@/services/word-clock.js';

describe('word-clock', () => {
  describe('getLetters', () => {
    test('french', () => {
      const letters = getLetters();
      expect(letters).toMatch(/^il\west.*midi\wminuit.*/i);
    });
  });

  describe('getStatus', () => {
    test('01:19', () => {
      const date = parse('2018-11-21T01:19:00');
      // prettier-ignore
      const expectedStatus =
      // ilnestodeuxquatretroisneufunesepthuitsixcinqmidixminuitonzerheuresmoinsoledixetrquartpmdvingt-cinquetsdemiepam
        '11011100000000000000000000111000000000000000000000000000000011111000000000000000000000001111100000000000000000';
      const actualStatus = getStatus(date);
      expect(actualStatus).toMatch(expectedStatus);
    });

    test('07:13', () => {
      const date = parse('2018-11-21T07:13:00');
      // prettier-ignore
      const expectedStatus =
      // ilnestodeuxquatretroisneufunesepthuitsixcinqmidixminuitonzerheuresmoinsoledixetrquartpmdvingt-cinquetsdemiepam
        '11011100000000000000000000000111100000000000000000000000000011111100000000000110111110000000000000000000000000';
      const actualStatus = getStatus(date);
      expect(actualStatus).toMatch(expectedStatus);
    });

    test('midday', () => {
      const date = parse('2018-11-21T12:00:00');
      const status = getStatus(date);
      expect(status).toMatch(/1101110{38}11110{62}/);
    });

    test('15:32', () => {
      const date = parse('2018-11-21T15:32:00');
      // prettier-ignore
      const expectedStatus =
      // ilnestodeuxquatretroisneufunesepthuitsixcinqmidixminuitonzerheuresmoinsoledixetrquartpmdvingt-cinquetsdemiepam
        '11011100000000000111110000000000000000000000000000000000000011111100000000000000000000000000000000011011111000';
      const actualStatus = getStatus(date);
      expect(actualStatus).toMatch(expectedStatus);
    });

    test('19:58', () => {
      const date = parse('2018-11-21T19:58:00');
      // prettier-ignore
      const expectedStatus =
      // ilnestodeuxquatretroisneufunesepthuitsixcinqmidixminuitonzerheuresmoinsoledixetrquartpmdvingt-cinquetsdemiepam
        '11011100000000000000000000000000011110000000000000000000000011111100000000000000000000000000000000000000000000';
      const actualStatus = getStatus(date);
      expect(actualStatus).toMatch(expectedStatus);
    });

    test('21:43', () => {
      const date = parse('2018-11-21T21:43:00');
      // prettier-ignore
      const expectedStatus =
      // ilnestodeuxquatretroisneufunesepthuitsixcinqmidixminuitonzerheuresmoinsoledixetrquartpmdvingt-cinquetsdemiepam
        '11011100000000000000000000000000000000000000001110000000000011111111111011000000111110000000000000000000000000';
      const actualStatus = getStatus(date);
      expect(actualStatus).toMatch(expectedStatus);
    });

    test('midnight', () => {
      const date = parse('2018-11-21T00:00:00');
      const status = getStatus(date);
      expect(status).toMatch(/1101110{43}1111110{55}/);
    });
  });

  describe('getLettersWithStatus', () => {
    test('midnight', () => {
      const date = parse('2018-11-21T00:00:00');
      const result = getLettersWithStatus(date);
      // assert letters
      const letters = result.map(pair => pair[0]).join('');
      expect(letters).toBe(getLetters());
      // assert status (cast from boolean to bit)
      const status = result.map(pair => (pair[1] ? '1' : '0')).join('');
      expect(status).toBe(getStatus(date));
    });
  });
});
