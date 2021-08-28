import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  email: yup.string().email('אימייל לא חוקי').required('שדה חובה'),
  password: yup
    .string()
    .min(2, 'שדה חובה')
    .max(20, 'מקסימום 20 תווים')
    .required('שדה חובה'),
});
