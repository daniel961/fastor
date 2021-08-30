import { Dialog } from '../../../ui';

export const BlockAppointmentsDialog = ({
  isBlockAppointmentsDialogOpen,
  closeBlockAppointmentsDialog,
}) => {
  const handleDialogClose = () => {
    // reset fields...
    closeBlockAppointmentsDialog();
  };

  return (
    <Dialog
      open={isBlockAppointmentsDialogOpen}
      onClose={handleDialogClose}
    ></Dialog>
  );
};

export default BlockAppointmentsDialog;
