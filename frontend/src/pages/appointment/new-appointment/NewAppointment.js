import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newAppointmentSchema } from './newAppointmentSchema';
import { TextField, Button, DatePicker, Select } from '../../../ui';
import NewAppointmentDialog from './new-appointment-dialog/NewAppointmentDialog';
import http from '../../../axios';
import moment from 'moment';

export const NewAppointment = () => {
  const [availableHours, setAvailableHours] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceIdValue, setServiceIdValue] = useState('');
  const [selectedHours, setSelectedHours] = useState({});
  const [workDays, setWorkDays] = useState([]);
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(newAppointmentSchema),
  });
  const dateValue = watch('date');
  const fullNameValue = watch('fullName');
  const isTimeFieldDisabled =
    !!serviceIdValue && !!dateValue && availableHours.length > 0;

  useEffect(() => {
    if (!history?.location?.state?.customerPhone) {
      history.push(`/404`);
    }
  }, [history]);

  useEffect(() => {
    const fetchWorkTimes = async () => {
      try {
        const response = await http.post('/business/get-work-times-external', {
          userId,
        });

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
  }, [userId]);

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

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        const response = await http.post(
          '/appointment/available-times-external',
          { userId, date: dateValue, serviceId: serviceIdValue },
        );

        setAvailableHours(response.data.availableHours);
      } catch (err) {}
    };

    if (serviceIdValue && dateValue) {
      fetchAvailableHours();
    }
  }, [dateValue, userId, serviceIdValue, workDays]);

  const onSubmit = async ({ fullName, date, service }) => {
    try {
      const response = await http.post('/appointment/insert', {
        fullName,
        date: dateValue.format(),
        service: {
          serviceId: serviceIdValue,
          serviceName: service,
        },
        time: selectedHours,
        userId,
        phone: history.location.state.customerPhone,
      });

      if (response.status === 200) {
        setOpen(true);
      }
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label='שם מלא'
        name='fullName'
        control={control}
        helperText={errors?.fullName?.message}
      />

      <Select
        label='איזה תור ?'
        name='service'
        control={control}
        options={services}
        optionKey='_id'
        optionValue='serviceName'
        disabled={!fullNameValue}
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
        disabled={!serviceIdValue}
        defaultValue={null}
        shouldDisableDate={day => {
          const dayName = moment(day).locale('en').format('dddd').toLowerCase();
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
      <NewAppointmentDialog open={open} />
    </form>
  );
};

export default NewAppointment;
