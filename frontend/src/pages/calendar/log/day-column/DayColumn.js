// import { AppointmentCard } from './DayColumnStyle';
import { useState } from 'react';
import { Button } from '../../../../ui';
import NewAppointmentDialog from '../../new-appointment-dialog/NewAppointmentDialog';

export const DayColumn = ({
  dayAppointments,
  workDays,
  getAppointmentsBetweenDates,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAppointmentDetails, setEditAppointmentDetails] = useState({});

  return (
    <div>
      {dayAppointments?.map((appointment, index) => {
        return (
          <div key={index}>
            <p>{appointment.fullName}</p>
            <p>
              {appointment.time.to} -{appointment.time.from}
            </p>
            <p>{appointment?.service?.serviceName}</p>
            <p>{!appointment.isBlocked && appointment.phone}</p>
            <div>
              {!appointment.isBlocked && (
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
            <div>
              <Button>ביטול</Button>
            </div>
          </div>
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
