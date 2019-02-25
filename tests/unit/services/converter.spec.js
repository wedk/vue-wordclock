import { toWordMask } from '@/services/converter.js';

describe('converter', () => {
  test('empty string', () => {
    const result = toWordMask``;
    const expectedMask = '00000000000';
    expect(result).toBe(expectedMask);
  });

  test('full string', () => {
    const result = toWordMask`abcdefghijk`;
    const expectedMask = '11111111111';
    expect(result).toBe(expectedMask);
  });

  test('static expression', () => {
    const result = toWordMask`    abc    `;
    const expectedMask = '00001110000';
    expect(result).toBe(expectedMask);
  });

  test('pad end', () => {
    const result = toWordMask`test`;
    const expectedMask = '11110000000';
    expect(result).toBe(expectedMask);
  });

  test('with gap and padding', () => {
    const result = toWordMask`  t t`;
    const expectedMask = '00101000000';
    expect(result).toBe(expectedMask);
  });

  test('begin with truthy expression', () => {
    const result = toWordMask`expr${true}`;
    const expectedMask = '11110000000';
    expect(result).toBe(expectedMask);
  });

  test('begin with falsy expression ', () => {
    const result = toWordMask`expr${false}`;
    const expectedMask = '00000000000';
    expect(result).toBe(expectedMask);
  });

  test('contain many expressions with padding', () => {
    const result = toWordMask` yes${true}no${false}test${true}`;
    const expectedMask = '01110011110';
    expect(result).toBe(expectedMask);
  });

  test('controversial', () => {
    const result = toWordMask`00000000000`;
    const expectedMask = '11111111111';
    expect(result).toBe(expectedMask);
  });
});
