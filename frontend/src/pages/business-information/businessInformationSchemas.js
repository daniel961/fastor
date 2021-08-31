import * as yup from 'yup';
import { phoneNumberPattern } from '../../libs/utils/regex-patterns';

export const businessInformationFormSchema = yup.object().shape({
  name: yup.string().min(2, 'לפחות 2 תווים').required('שדה חובה'),
  phone: yup
    .string()
    .required('שדה חובה')
    .matches(phoneNumberPattern, 'טלפון לא חוקי'),
  address: yup.string().required('שדה חובה'),
});

export const servicesSchema = yup.object().shape({
  serviceName: yup.string().min(2, 'לפחות 2 תווים').required('שדה חובה'),
  price: yup.string(),
  hourDuration: yup.string().required('שדה חובה'),
  minDuration: yup.string().required('שדה חובה'),
});
