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
}) => {
  const [availableHours, setAvailableHours] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceIdValue, setServiceIdValue] = useState('');
  const [workDays, setWorkDays] = useState([]);
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

  useEffect(() => {
    const fetchWorkTimes = async () => {
      try {
        const response = await http.get('/business/get-work-times');

        if (response.status === 200) {
          if (response.data) {
            const days = response.data[0].activityTimes.map(activity => {
              return activity.days[0];
            });

            setWorkDays(days);
          }
        }
      } catch (e) {}
    };

    fetchWorkTimes();
  }, []);

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

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        const response = await http.post(
          '/appointment/available-times-internal',
          { date: dateValue, serviceId: serviceIdValue },
        );

        setAvailableHours(response.data.availableHours);
      } catch (err) {}
    };

    if (serviceIdValue && dateValue) {
      fetchAvailableHours();
    }
  }, [dateValue, serviceIdValue, workDays]);

  const onSubmit = async ({ fullName, date, service, phone }) => {
    try {
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
        reset({});
        closeNewAppointmentsDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={isNewAppointmentsDialogOpen}
      onClose={() => {
        reset({});
        closeNewAppointmentsDialog();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='שם מלא'
          name='fullName'
          control={control}
          helperText={errors?.fullName?.message}
        />

        <TextField
          label='הטלפון של הלקוח *'
          control={control}
          name='phone'
          helperText={errors?.phone?.message}
        />

        <Select
          label='איזה תור ?'
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
          label='באיזה תאריך ?'
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
            return year !== currentYear || !workDays.includes(dayName);
          }}
        />

        <Select
          disabled={!isTimeFieldDisabled}
          label='באיזה שעה ?'
          name='time'
          control={control}
          options={availableHours}
          optionKey='from'
          optionValue='from'
          helperText={errors?.time?.message}
          onChange={e => {
            const selectedTime = availableHours.find(({ from, to }) => {
              return from === e.target.value;
            });

            setSelectedHours(selectedTime);
            setValue('time', e.target.value);
          }}
        />

        <Button type='submit'>קביעת תור</Button>
      </form>
    </Dialog>
  );
};

export default NewAppointmentDialog;

const newAppointmentSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'לפחות 2 תווים')
    .max(25, 'שם קצת ארוך לא?')
    .required('שדה חובה'),
  service: yup.string().required('שדה חובה'),
  date: yup.string().required('שדה חובה').nullable(true),
  time: yup.string().required('שדה חובה'),
  phone: yup
    .string()
    .required('שדה חובה')
    .matches(phoneNumberPattern, 'טלפון לא חוקי'),
});
