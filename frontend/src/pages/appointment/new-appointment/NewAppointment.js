import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newAppointmentSchema } from './newAppointmentSchema';
import { TextField, Button, DatePicker, Select } from '../../../ui';
import http from '../../../axios';

export const NewAppointment = () => {
  const [availableHours, setAvailableHours] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceIdValue, setServiceIdValue] = useState('');
  const [selectedHours, setSelectedHours] = useState({});
  const { userId } = useParams();
  const {
    control,
    handleSubmit,
    // formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(newAppointmentSchema),
  });
  const dateValue = watch('date');
  const isTimeFieldDisabled =
    !!serviceIdValue && !!dateValue && availableHours.length > 0;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await http.post('/service/get-services', {
          userId,
        });

        if (response.data[0]) {
          setServices(response.data[0].services);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchServices();
  }, [userId]);

  console.log(services);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        const response = await http.post(
          '/appointment/available-times-external',
          { userId, date: dateValue, serviceId: serviceIdValue },
        );
        setAvailableHours(response.data);
        console.log(response.data);
      } catch (err) {}
    };

    if (serviceIdValue && dateValue) {
      fetchAvailableHours();
    }
  }, [dateValue, userId, serviceIdValue]);

  const onSubmit = async ({ fullName, date, service, time }) => {
    console.log(fullName, date, service, selectedHours);
    try {
      const response = await http.post('/appointment/insert', {
        fullName,
        date,
        serviceId: serviceIdValue,
        time: selectedHours,
        userId,
      });

      console.log(response);
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label='שם מלא' name='fullName' control={control} />

      <Select
        label='איזה תור ?'
        name='service'
        control={control}
        options={services}
        optionKey='_id'
        optionValue='serviceName'
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
        shouldDisableDate={day => {
          const year = day.year();
          const currentYear = new Date().getFullYear();

          return year !== currentYear;
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
  );
};

export default NewAppointment;
