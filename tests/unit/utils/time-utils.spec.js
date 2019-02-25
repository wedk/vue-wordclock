import { formatTime } from '@/utils/time-utils.js';

describe('time-utils', () => {
  describe('formatTime', () => {
    test('00:00:00', () => {
      const date = new Date(2018, 11, 21, 0, 0, 0);
      const expectedFormat = '00:00:00';
      expect(formatTime(date)).toBe(expectedFormat);
    });

    test('08:05:09', () => {
      const date = new Date(2018, 11, 21, 8, 5, 9);
      const expectedFormat = '08:05:09';
      expect(formatTime(date)).toBe(expectedFormat);
    });

    test('15:36:45', () => {
      const date = new Date(2018, 11, 21, 15, 36, 45);
      const expectedFormat = '15:36:45';
      expect(formatTime(date)).toBe(expectedFormat);
    });
  });
});
