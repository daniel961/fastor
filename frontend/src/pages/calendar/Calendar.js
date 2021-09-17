import { useState, useEffect } from 'react';
import { CalendarContainer, useDatepickerStyles } from './CalendarStyles';
import { useFastorForm } from '../../libs/hooks';
import { DatePicker } from '../../ui';
import AdminNavbar from './calendar-navbar/CalendarNavbar';
import BlockAppointmentsDialog from './block-appointments-dialog/BlockAppointmentsDialog';
import Log from './log/Log';
import moment from 'moment';
import http from '../../axios';

export const Calendar = () => {
  const [weekAppointments, setWeekAppointments] = useState([]);
  const [blockAppointmentsDialogOpen, setBlockAppointmentsDialogOpen] =
    useState(false);
  const { control, watch } = useFastorForm();
  const classes = useDatepickerStyles();
  const selectedDateValue = watch('selectedDate');

  useEffect(() => {
    const startWeek = moment(selectedDateValue).startOf('week').format();
    const endWeek = moment(selectedDateValue).endOf('week').format();

    const getAppointmentsBetweenDates = async () => {
      try {
        const response = await http.post(
          '/appointment/get-appointments-between',
          {
            startWeek,
            endWeek,
          },
        );

        if (response.status === 200) {
          setWeekAppointments(response.data);
        }
      } catch (error) {}
    };

    getAppointmentsBetweenDates();
  }, [selectedDateValue]);

  /**
   * TODO: Check if user have services & workingTimes & business information set up before showing him this calendar,
   * else - redirect him to business-information route
   */

  const openBlockAppointmentsDialog = () => {
    setBlockAppointmentsDialogOpen(true);
  };

  const closeBlockAppointmentsDialog = () => {
    setBlockAppointmentsDialogOpen(false);
  };

  return (
    <CalendarContainer>
      <AdminNavbar openBlockAppointmentsDialog={openBlockAppointmentsDialog} />

      <DatePicker
        name='selectedDate'
        control={control}
        variant='static'
        className={classes.staticWrapperRoot}
      />

      <Log
        weekAppointments={weekAppointments}
        selectedDateValue={selectedDateValue}
      />

      <BlockAppointmentsDialog
        isBlockAppointmentsDialogOpen={blockAppointmentsDialogOpen}
        closeBlockAppointmentsDialog={closeBlockAppointmentsDialog}
      />
    </CalendarContainer>
  );
};

export default Calendar;
