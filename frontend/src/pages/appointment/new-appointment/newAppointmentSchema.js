import * as yup from 'yup';

export const newAppointmentSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'לפחות 2 תווים')
    .max(25, 'שם קצת ארוך לא?')
    .required('שדה חובה'),
  service: yup.string().required('שדה חובה'),
  date: yup.string().required('שדה חובה').nullable(true),
  time: yup.string().required('שדה חובה'),
});
