export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const getWeekDay = (date: Date): Weekday => {
  const day = date.getDay();

  const days = {
    [Weekday.Monday]: 1,
    [Weekday.Tuesday]: 2,
    [Weekday.Wednesday]: 3,
    [Weekday.Thursday]: 4,
    [Weekday.Friday]: 5,
    [Weekday.Saturday]: 6,
    [Weekday.Sunday]: 0,
  };

  for (const key in days) {
    if (days[key as keyof typeof days] === day) {
      return key as keyof typeof days;
    }
  }

  throw new Error('Invalid date given');
};

export const humanDuration = (duration: any): string => {
  const num = duration;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return rhours + 'h ' + rminutes + 'min';
};
