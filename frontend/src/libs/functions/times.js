import moment from 'moment';

/*
 1. Check if start is not after the end
 2. Check if start is not equal to end
 3. Check if end is not before the start
 4. Check if end is not equal to start
*/
export const isValidTimeRange = (from, to) => {
  const format = 'hh:mm';
  const mFrom = moment(from, format);
  const mTo = moment(to, format);

  if (mFrom.isBefore(mTo) && mTo.isAfter(mFrom)) {
    return true;
  }

  return false;
};

export const isBetweenHours = (rangeStart, rangeEnd, from, to) => {
  const format = 'hh:mm';
  const mRangeStart = moment(rangeStart, format);
  const mRangeEnd = moment(rangeEnd, format);
  const mFrom = moment(from, format);
  const mTo = moment(to, format);

  if (
    mFrom.isBetween(mRangeStart, mRangeEnd) &&
    mTo.isBetween(mRangeStart, mRangeEnd)
  ) {
    return true;
  }

  return false;
};

export const enumerateDaysBetweenDates = (startDate, endDate) => {
  const now = moment(startDate).clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push({
      date: now.format('DD/MM'),
      dayName: now.format('dddd'),
    });

    now.add(1, 'days');
  }

  return dates;
};
