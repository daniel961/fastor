import { useState, useEffect, useContext } from 'react';
import { LoaderContext } from '../../context/loader/LoaderState';
import { CalendarContainer, useDatepickerStyles } from './CalendarStyles';
import { useFastorForm, usePrevious } from '../../libs/hooks';
import { DatePicker } from '../../ui';
import { enumerateDaysBetweenDates } from '../../libs/functions/times';
import AdminNavbar from './calendar-navbar/CalendarNavbar';
import BlockAppointmentsDialog from './block-appointments-dialog/BlockAppointmentsDialog';
import NewAppointmentsDialog from './new-appointment-dialog/NewAppointmentDialog';
import Log from './log/Log';
import moment from 'moment';
import http from '../../axios';

export const Calendar = () => {
  const { handleSetLoading } = useContext(LoaderContext);
  const [weekAppointments, setWeekAppointments] = useState([]);
  const [blockAppointmentsDialogOpen, setBlockAppointmentsDialogOpen] =
    useState(false);
  const [newAppointmentsDialogOpen, setNewAppointmentsDialogOpen] =
    useState(false);
  const [workDays, setWorkDays] = useState([]);
  const { control, watch } = useFastorForm();
  const classes = useDatepickerStyles();
  const selectedDateValue = watch('selectedDate');
  const prevSelectedDate = usePrevious(selectedDateValue);
  const startWeek = moment(selectedDateValue).startOf('week').format();
  const endWeek = moment(selectedDateValue).endOf('week').format();
  const weekDates = enumerateDaysBetweenDates(startWeek, endWeek);

  useEffect(() => {
    const fetchWorkTimes = async () => {
      try {
        const response = await http.get('/business/get-work-times');

        if (response.status === 200 && response.data) {
          const days = response.data[0].activityTimes.map(activity => {
            return activity.days[0];
          });

          setWorkDays(days);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchWorkTimes();
  }, []);

  const getAppointmentsBetweenDates = async () => {
    try {
      handleSetLoading({ isLoading: true });
      const response = await http.post(
        '/appointment/get-appointments-between',
        {
          startWeek: startWeek || moment(new Date()).startOf('week').format(),
          endWeek: endWeek || moment(new Date()).endOf('week').format(),
        },
      );

      if (response.status === 200) {
        setWeekAppointments(response.data);
        handleSetLoading({ isLoading: false, delay: 2500 });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!newAppointmentsDialogOpen) {
      // Trigger call at first mount with default dates inside getAppointmentsBetweenDates function
      getAppointmentsBetweenDates();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAppointmentsDialogOpen]);

  useEffect(() => {
    const momentPrevDate = moment(prevSelectedDate);
    const isSameWeek = moment(selectedDateValue).isSame(momentPrevDate, 'week');

    if (!newAppointmentsDialogOpen && selectedDateValue && !isSameWeek) {
      getAppointmentsBetweenDates();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedDateValue,
    startWeek,
    endWeek,
    newAppointmentsDialogOpen,
    prevSelectedDate,
  ]);

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

  const openNewAppointmentsDialog = () => {
    setNewAppointmentsDialogOpen(true);
  };

  const closeNewAppointmentsDialog = () => {
    setNewAppointmentsDialogOpen(false);
  };

  return (
    <CalendarContainer>
      <AdminNavbar
        openBlockAppointmentsDialog={openBlockAppointmentsDialog}
        openNewAppointmentsDialog={openNewAppointmentsDialog}
      />

      <DatePicker
        name='selectedDate'
        control={control}
        variant='static'
        className={classes.staticWrapperRoot}
        shouldDisableDate={day => {
          const dayName = moment(day).locale('en').format('dddd').toLowerCase();
          const year = day.year();
          const currentYear = new Date().getFullYear();
          return year > currentYear || !workDays.includes(dayName);
        }}
      />

      <Log
        weekAppointments={weekAppointments}
        selectedDateValue={selectedDateValue}
        weekDates={weekDates}
        workDays={workDays}
        getAppointmentsBetweenDates={getAppointmentsBetweenDates}
      />

      <BlockAppointmentsDialog
        workDays={workDays}
        isBlockAppointmentsDialogOpen={blockAppointmentsDialogOpen}
        closeBlockAppointmentsDialog={closeBlockAppointmentsDialog}
      />

      <NewAppointmentsDialog
        editMode={false}
        workDays={workDays}
        isNewAppointmentsDialogOpen={newAppointmentsDialogOpen}
        closeNewAppointmentsDialog={closeNewAppointmentsDialog}
      />
    </CalendarContainer>
  );
};

export default Calendar;
