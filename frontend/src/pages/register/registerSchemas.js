import { phoneNumberPattern } from '../../libs/utils/regex-patterns';
import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'שדה חובה')
    .max(20, 'מקסימום 20 תווים')
    .required('שדה חובה'),
  email: yup.string().email('אימייל לא חוקי').required('שדה חובה'),
  password: yup
    .string()
    .min(7, 'מינימום 7 תווים')
    .max(20, 'מקסימום 20 תווים')
    .required('שדה חובה'),
  verifyPassword: yup
    .string()
    .required('שדה חובה')
    .oneOf([yup.ref('password'), null], 'הסיסמה לא תואמת לשדה הקודם'),
  phone: yup
    .string()
    .required('שדה חובה')
    .matches(phoneNumberPattern, 'טלפון לא חוקי'),
});
