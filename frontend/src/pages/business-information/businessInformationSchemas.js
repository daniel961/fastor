import * as yup from 'yup';
import { phoneNumberPattern } from '../../libs/utils/regex-patterns';
import { englishWorkingDays } from '../../libs/utils/globals';
import { isValidTimeRange } from '../../libs/functions/times';

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

export const workingHoursFormSchema = yup
  .object()
  .shape({
    friday: yup.boolean(),
    monday: yup.boolean(),
    saturday: yup.boolean(),
    sunday: yup.boolean(),
    thursday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    sundayStartHour: yup.string(),
    sundayStartMinute: yup.string(),
    mondayStartHour: yup.string(),
    mondayStartMinute: yup.string(),
    tuesdayStartHour: yup.string(),
    tuesdayStartMinute: yup.string(),
    wednesdayStartHour: yup.string(),
    wednesdayStartMinute: yup.string(),
    thursdayStartHour: yup.string(),
    thursdayStartMinute: yup.string(),
    fridayStartHour: yup.string(),
    fridayStartMinute: yup.string(),
    saturdayStartHour: yup.string(),
    saturdayStartMinute: yup.string(),
  })
  .test(
    'at-least-one-day-selected',
    'חובה לסמן לפחות יום עבודה אחד',
    function (value) {
      if (
        !value.sunday &&
        !value.monday &&
        !value.friday &&
        !value.saturday &&
        !value.thursday &&
        !value.tuesday &&
        !value.wednesday
      ) {
        return this.createError({
          message: `יש לבחור לפחות יום עבודה אחד`,
          path: 'workDays',
        });
      }

      return true;
    },
  )
  .test('all-ranges-are-valid', 'טווח שעות עבודה ואלידי', function (value) {
    const error = {
      hasError: false,
      message: '',
    };

    englishWorkingDays.forEach(day => {
      if (value[day]) {
        const hoursStart = value[`${day}StartHour`];
        const minutesStart = value[`${day}StartMinute`];
        const hoursEnd = value[`${day}EndHour`];
        const minutesEnd = value[`${day}EndMinute`];
        const from = `${hoursStart}:${minutesStart}`;
        const to = `${hoursEnd}:${minutesEnd}`;

        if (
          hoursStart === '' ||
          minutesStart === '' ||
          hoursEnd === '' ||
          minutesEnd === ''
        ) {
          error.hasError = true;
          return (error.message =
            'נא לוודא ששעת ההתחלה והסיום של הימים שבחרת מלאים');
        }

        if (!isValidTimeRange(from, to)) {
          error.hasError = true;
          error.message =
            'נא לוודא שהטווח בין כל שעות ההתחלה והסיום שבחרת הגיוני';
        }
      }
    });

    if (error.hasError) {
      return this.createError({
        message: error.message,
        path: 'workDays',
      });
    }

    error.hasError = false;
    return true;
  });
