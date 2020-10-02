import {getWeekDay, humanDuration, Weekday} from './dateTimeHelper';

describe('dateTimeHelper', () => {
  describe('#getWeekDay()', () => {
    it('should return human week day', () => {
      test.each`
        date                                    | expected
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Thursday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Friday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Saturday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Sunday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Monday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Tuesday}
        ${new Date('2020-10-02T02:52:51.386Z')} | ${Weekday.Wednesday}
      `('should return $expected for the given date', ({date, expected}) => {
        expect(getWeekDay(date)).toBe(expected);
      });
    });
  });

  describe('#humanDuration()', () => {
    it('should return the duration in human readable', () => {
      expect(humanDuration('202')).toBe('3h 22min');
    });
  });
});
