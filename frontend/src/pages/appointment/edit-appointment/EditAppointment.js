import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '../../../ui';
import http from '../../../axios';

export const EditAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { userId } = useParams();
  const history = useHistory();
  const phone = history?.location?.state?.customerPhone;

  useEffect(() => {
    if (!phone) {
      history.push(`/404`);
    }
  }, [history, phone]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await http.post('/appointment/get-appointments', {
          userId,
          phone,
        });

        if (data.length > 0) {
          setAppointments(data);
        }
      } catch (e) {}
    };

    fetchAppointments();
  }, [userId, phone]);

  const cancelAppointment = async appointmentId => {
    try {
      const response = await http.post('/appointment/cancel-appointment', {
        appointmentId,
      });

      console.log(response);
      if (response.status === 200) {
        const copy = [...appointments];
        const appointmentIndex = copy.findIndex(
          appointment => appointment._id === appointmentId,
        );
        copy.splice(appointmentIndex, 1);
        setAppointments(copy);
      }
    } catch (e) {}
  };

  return (
    <div>
      {appointments.length > 0 ? (
        <div>
          <h1>שלום</h1>
          <h2>רשימת התורים שלך:</h2>
          {appointments.map(({ _id, date, time, service, isBlocked }) => {
            if (!isBlocked) {
              return (
                <div key={_id}>
                  <p>{service.serviceName}</p>
                  <p>{date}</p>
                  <p>
                    {time.from} - {time.to}
                  </p>
                  <Button onClick={() => cancelAppointment(_id)}>
                    ביטול תור
                  </Button>
                </div>
              );
            }

            return null;
          })}

          <Button onClick={() => history.push(`/appointment/${userId}`)}>
            לחזרה לדף העסק
          </Button>
        </div>
      ) : (
        <h1>אין תורים קיימים</h1>
      )}
    </div>
  );
};

export default EditAppointment;
