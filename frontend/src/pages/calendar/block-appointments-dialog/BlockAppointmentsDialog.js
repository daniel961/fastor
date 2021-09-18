import { useState, useEffect } from 'react';
import { Dialog, Button, Select, DatePicker, ErrorText } from '../../../ui';
import { useForm } from 'react-hook-form';
import { hrs, mins } from '../../../libs/utils/hourAndMinutes';
import http from '../../../axios';
import moment from 'moment';

export const BlockAppointmentsDialog = ({
  workDays,
  isBlockAppointmentsDialogOpen,
  closeBlockAppointmentsDialog,
}) => {
  const [errorText, setErrorText] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isBlockAppointmentsDialogOpen) {
      setErrorText('');
    }
  }, [isBlockAppointmentsDialogOpen]);

  const handleDialogClose = () => {
    reset({});
    closeBlockAppointmentsDialog();
  };

  const onSubmit = async ({
    date,
    fromMinutes,
    fromHours,
    toMinutes,
    toHours,
  }) => {
    const fromTime = `${fromHours}:${fromMinutes}`;
    const toTime = `${toHours}:${toMinutes}`;

    try {
      const response = await http.post(
        '/appointment/insert-blocked-appointment',
        {
          date,
          fromTime,
          toTime,
        },
      );

      if (response.status === 200) {
        handleDialogClose();
      }
    } catch (e) {
      setErrorText(e.response.data);
    }
  };

  return (
    <Dialog open={isBlockAppointmentsDialogOpen} onClose={handleDialogClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DatePicker
          label='באיזה תאריך ?'
          name='date'
          control={control}
          disablePast
          disableToolbar
          helperText={errors?.date?.message}
          defaultValue={null}
          shouldDisableDate={day => {
            const dayName = moment(day)
              .locale('en')
              .format('dddd')
              .toLowerCase();
            const year = day.year();
            const currentYear = new Date().getFullYear();
            return year > currentYear || !workDays.includes(dayName);
          }}
        />

        <Select
          name='fromMinutes'
          label='דקות'
          control={control}
          options={mins}
          helperText={errors?.fromMinutes?.message}
        />

        <Select
          name='fromHours'
          label='שעות'
          control={control}
          options={hrs}
          helperText={errors?.fromHours?.message}
        />

        <Select
          name='toMinutes'
          label='דקות'
          control={control}
          options={mins}
          helperText={errors?.fromMinutes?.message}
        />

        <Select
          name='toHours'
          label='שעות'
          control={control}
          options={hrs}
          helperText={errors?.fromHours?.message}
        />

        <Button type='submit'>חסום תור</Button>
        <ErrorText text={errorText} />
      </form>
    </Dialog>
  );
};

export default BlockAppointmentsDialog;
