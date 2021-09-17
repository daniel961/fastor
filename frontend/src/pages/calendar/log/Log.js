import { Fragment } from 'react';
import { LogWrapper } from './LogStyles';
import { useMediaQuery } from '@material-ui/core';
import DayColumn from './day-column/DayColumn';
import moment from 'moment';

export const Log = ({ weekAppointments, selectedDateValue }) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const currentDayWeekIndex = moment(selectedDateValue).day();

  return (
    <LogWrapper>
      {!matches ? (
        weekAppointments.map((dayAppointments, index) => {
          if (dayAppointments.length > 0) {
            return (
              <Fragment key={index}>
                <DayColumn dayAppointments={dayAppointments} />
              </Fragment>
            );
          }

          return <div key={index}>אין תורים ביום זה</div>;
        })
      ) : weekAppointments[currentDayWeekIndex]?.length > 0 ? (
        <DayColumn dayAppointments={weekAppointments[currentDayWeekIndex]} />
      ) : (
        <div>אין תורים ביום זה</div>
      )}
    </LogWrapper>
  );
};

export default Log;
