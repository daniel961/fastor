import http from '../../axios';
import { useEffect } from 'react';

export const Calendar = () => {
  useEffect(() => {
    http.get('/business/information').then(res => {
      console.log(res);
    });
  }, []);

  return <>hello calendar :)</>;
};

export default Calendar;
