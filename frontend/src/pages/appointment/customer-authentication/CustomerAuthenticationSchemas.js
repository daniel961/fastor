import * as yup from 'yup';
import { phoneNumberPattern } from '../../../libs/utils/regex-patterns';

export const customerDetailsSchema = yup.object().shape({
  validationCode: yup
    .string()
    .min(4, 'הקוד צריך להכיל 4 ספרות')
    .max(4, 'הקוד צריך להכיל 4 ספרות')
    .required('שדה חובה'),
});

export const customerAuthenticationSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(2, 'שם לא חוקי')
    .max(20, 'מקסימום 20 תווים')
    .required('שדה חובה'),
  customerPhone: yup
    .string()
    .required('שדה חובה')
    .matches(phoneNumberPattern, 'טלפון לא חוקי'),
});
