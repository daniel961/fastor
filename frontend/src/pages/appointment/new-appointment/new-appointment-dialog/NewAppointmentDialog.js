import { useEffect } from 'react';
import { Dialog } from '../../../../ui';
import { useHistory, useParams } from 'react-router-dom';

export const NewAppointmentDialog = ({ open }) => {
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        history.push(`/appointment/${userId}`);
      }, 5000);
    }
  }, [open, history, userId]);

  return (
    <Dialog open={open}>
      <h1>התור נקבע בהצלחה</h1>
      <h2>הינך מועבר/ת לדף העסק ... </h2>
    </Dialog>
  );
};

export default NewAppointmentDialog;
