import { Fragment } from 'react';
import { LogWrapper } from './LogStyles';
import { useMediaQuery } from '@mui/material';
import DayColumn from './day-column/DayColumn';
import moment from 'moment';

export const Log = ({
  weekAppointments,
  selectedDateValue,
  weekDates,
  workDays,
  getAppointmentsBetweenDates,
}) => {
  const matchesWidth = useMediaQuery('(max-width: 999px)');
  const currentDayWeekIndex = moment(selectedDateValue).day();

  return (
    <LogWrapper>
      {!matchesWidth ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1.2rem 4rem',
            }}
          >
            {weekDates?.map(({ date, dayName }) => {
              return (
                <strong key={date}>
                  {date} - {dayName}
                </strong>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {weekAppointments.map((dayAppointments, index) => {
              if (dayAppointments.length > 0) {
                return (
                  <Fragment key={index}>
                    <DayColumn
                      dayAppointments={dayAppointments}
                      workDays={workDays}
                      getAppointmentsBetweenDates={getAppointmentsBetweenDates}
                    />
                  </Fragment>
                );
              }

              return <div key={index}>אין תורים ביום זה</div>;
            })}
          </div>
        </>
      ) : weekAppointments[currentDayWeekIndex]?.length > 0 ? (
        <DayColumn
          dayAppointments={weekAppointments[currentDayWeekIndex]}
          workDays={workDays}
          getAppointmentsBetweenDates={getAppointmentsBetweenDates}
        />
      ) : (
        <div>אין תורים ביום זה</div>
      )}
    </LogWrapper>
  );
};

export default Log;
