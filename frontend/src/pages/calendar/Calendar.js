import { useState } from 'react';
import { CalendarContainer, useDatepickerStyles } from './CalendarStyles';
import { useFastorForm } from '../../libs/hooks';
import { DatePicker } from '../../ui';
import AdminNavbar from './calendar-navbar/CalendarNavbar';
import BlockAppointmentsDialog from './block-appointments-dialog/BlockAppointmentsDialog';
import Log from './log/Log';

export const Calendar = () => {
  const [blockAppointmentsDialogOpen, setBlockAppointmentsDialogOpen] =
    useState(false);
  const { control } = useFastorForm();

  const classes = useDatepickerStyles();

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

      <Log />

      <BlockAppointmentsDialog
        isBlockAppointmentsDialogOpen={blockAppointmentsDialogOpen}
        closeBlockAppointmentsDialog={closeBlockAppointmentsDialog}
      />
    </CalendarContainer>
  );
};

export default Calendar;
