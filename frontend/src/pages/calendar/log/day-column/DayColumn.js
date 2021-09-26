import { AppointmentCard } from './DayColumnStyle';
import { useState } from 'react';
import { Button } from '../../../../ui';
import NewAppointmentDialog from '../../new-appointment-dialog/NewAppointmentDialog';
import moment from 'moment';
import http from '../../../../axios';

export const DayColumn = ({
  dayAppointments,
  workDays,
  getAppointmentsBetweenDates,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAppointmentDetails, setEditAppointmentDetails] = useState({});

  const handleCancelAppointment = async appointmentId => {
    try {
      const response = await http.post('/appointment/cancel-appointment', {
        appointmentId,
      });

      if (response.status === 200) {
        getAppointmentsBetweenDates();
      }
    } catch (e) {}
  };

  return (
    <div>
      {dayAppointments?.map((appointment, index) => {
        const now = moment();
        const appointmentDate = moment(appointment.date);
        const { from } = appointment.time;
        const [hour, minute] = from.split(':');
        appointmentDate.set({ hour, minute });
        const diff = moment.utc(now.diff(appointmentDate))._i;

        return (
          <AppointmentCard
            expandable
            cardTitle={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong>
                  {appointment.time.to} -{appointment.time.from}
                </strong>
                <p>{appointment.fullName}</p>
              </div>
            }
            key={index}
          >
            <p>{appointment?.service?.serviceName}</p>
            <p>{!appointment.isBlocked && appointment.phone}</p>
            <div>
              {!appointment.isBlocked && diff <= 0 && (
                <Button
                  onClick={() => {
                    setEditAppointmentDetails(appointment);
                    setDialogOpen(true);
                  }}
                >
                  עריכה
                </Button>
              )}
            </div>

            {diff <= 0 && (
              <div>
                <Button
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  ביטול
                </Button>
              </div>
            )}
          </AppointmentCard>
        );
      })}

      <NewAppointmentDialog
        isNewAppointmentsDialogOpen={dialogOpen}
        closeNewAppointmentsDialog={() => setDialogOpen(false)}
        editMode
        editAppointmentDetails={editAppointmentDetails}
        workDays={workDays}
        getAppointmentsBetweenDates={getAppointmentsBetweenDates}
      />
    </div>
  );
};

export default DayColumn;
