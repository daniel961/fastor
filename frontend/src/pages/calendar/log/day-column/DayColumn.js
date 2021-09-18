// import { AppointmentCard } from './DayColumnStyle';

export const DayColumn = ({ dayAppointments }) => {
  return (
    <div>
      {dayAppointments?.map((appointment, index) => {
        console.log(appointment);
        return (
          <div key={index}>
            <p>{appointment.fullName}</p>
            <p>
              {appointment.time.to} -{appointment.time.from}
            </p>
            <p>{appointment?.service?.serviceName}</p>
            <p>{!appointment.isBlocked && appointment.phone}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DayColumn;
