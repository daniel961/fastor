import { useState, useEffect } from 'react';
import { Dialog, TextField, Select, Button, DatePicker } from '../../../ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import * as yup from 'yup';
import http from '../../../axios';
import { phoneNumberPattern } from '../../../libs/utils/regex-patterns';

export const NewAppointmentDialog = ({
  isNewAppointmentsDialogOpen,
  closeNewAppointmentsDialog,
  workDays,
  editMode,
  editAppointmentDetails,
  getAppointmentsBetweenDates,
}) => {
  const [availableHours, setAvailableHours] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceIdValue, setServiceIdValue] = useState('');
  const [selectedHours, setSelectedHours] = useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(newAppointmentSchema),
  });

  const dateValue = watch('date');
  const isTimeFieldDisabled =
    !!serviceIdValue && !!dateValue && availableHours.length > 0;
  const haveAvailableHours = availableHours.length;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await http.get('/service');

        if (response.data[0]) {
          setServices(response.data[0].services);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isNewAppointmentsDialogOpen) {
      fetchServices();
    }
  }, [isNewAppointmentsDialogOpen]);

  const fetchAvailableHours = async (
    existingDate,
    existingHours,
    existingServiceId,
  ) => {
    try {
      const response = await http.post(
        '/appointment/available-times-internal',
        {
          date: existingDate || dateValue,
          serviceId: existingServiceId || serviceIdValue,
        },
      );

      if (existingHours) {
        const hours = [existingHours, ...response.data.availableHours];
        setAvailableHours(hours);
      } else {
        setAvailableHours(response.data.availableHours);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (serviceIdValue && dateValue && !editMode) {
      fetchAvailableHours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue, serviceIdValue, workDays, editMode]);

  useEffect(() => {
    if (
      editMode &&
      isNewAppointmentsDialogOpen &&
      !haveAvailableHours &&
      editAppointmentDetails?.date
    ) {
      const { fullName, phone, date, service, time } = editAppointmentDetails;

      reset({
        fullName,
        phone,
        date,
      });

      fetchAvailableHours(date, time, service?.serviceId);
      setSelectedHours(time);
      setServiceIdValue(service?.serviceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editMode,
    editAppointmentDetails,
    isNewAppointmentsDialogOpen,
    reset,
    dateValue,
    serviceIdValue,
  ]);

  const onSubmit = async ({ fullName, date, service, phone }) => {
    try {
      if (editMode) {
        const response = await http.post('/appointment/edit-appointment', {
          appointmentId: editAppointmentDetails._id,
          fullName,
          date: moment(date),
          service: {
            serviceId: serviceIdValue,
            serviceName: service,
          },
          time: selectedHours,
          phone,
        });

        if (response.status === 200) {
          fetchAvailableHours(date, selectedHours, serviceIdValue);
          getAppointmentsBetweenDates();
          reset();
          closeNewAppointmentsDialog();
        }
      } else {
        const response = await http.post('/appointment/insert-internal', {
          fullName,
          date: moment(date),
          service: {
            serviceId: serviceIdValue,
            serviceName: service,
          },
          time: selectedHours,
          phone,
        });

        if (response.status === 200) {
          handleCloseDialog();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseDialog = () => {
    reset({});
    closeNewAppointmentsDialog();
  };

  return (
    <Dialog
      open={isNewAppointmentsDialogOpen}
      onClose={() => {
        closeNewAppointmentsDialog();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='???? ??????'
          name='fullName'
          control={control}
          helperText={errors?.fullName?.message}
        />

        <TextField
          label='???????????? ???? ?????????? *'
          control={control}
          name='phone'
          helperText={errors?.phone?.message}
        />

        <Select
          label='???????? ?????? ?'
          name='service'
          control={control}
          options={services}
          optionKey='_id'
          optionValue='serviceName'
          helperText={errors?.service?.message}
          onChange={(e, newVal) => {
            setServiceIdValue(newVal.key.replace('.$', ''));
            setValue('service', e.target.value);
          }}
        />

        <DatePicker
          label='?????????? ?????????? ?'
          name='date'
          control={control}
          disablePast
          disableToolbar
          helperText={errors?.date?.message}
          defaultValue={null}
          disabled={!serviceIdValue}
          shouldDisableDate={day => {
            const dayName = moment(day)
              .locale('en')
              .format('dddd')
              .toLowerCase();
            const year = day.year();
            const currentYear = new Date().getFullYear();
            return year !== currentYear || !workDays?.includes(dayName);
          }}
        />

        <Select
          disabled={!isTimeFieldDisabled}
          label='?????????? ?????? ?'
          name='time'
          control={control}
          options={availableHours}
          optionKey='from'
          optionValue='from'
          helperText={errors?.time?.message}
          onChange={e => {
            const selectedTime = availableHours.find(({ from }) => {
              return from === e.target.value;
            });

            setSelectedHours(selectedTime);
            setValue('time', e.target.value);
          }}
        />

        <Button type='submit'>{editMode ? '?????????? ??????' : '?????????? ??????'}</Button>
      </form>
    </Dialog>
  );
};

export default NewAppointmentDialog;

const newAppointmentSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, '?????????? 2 ??????????')
    .max(25, '???? ?????? ???????? ?????')
    .required('?????? ????????'),
  service: yup.string().required('?????? ????????'),
  date: yup.string().required('?????? ????????').nullable(true),
  time: yup.string().required('?????? ????????'),
  phone: yup
    .string()
    .required('?????? ????????')
    .matches(phoneNumberPattern, '?????????? ???? ????????'),
});
