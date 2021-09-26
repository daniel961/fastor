import { Dialog as MuiDialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

export const Dialog = props => {
  const classes = useStyles();

  return (
    <MuiDialog
      {...props}
      classes={{ paper: classes.paper }}
      className={props.className}
    >
      {props.withCloseIcon && (
        <IconButton
          onClick={props.onClose}
          style={{ left: '0', top: '0', position: 'absolute' }}
          size="large">
          <CloseIcon />
        </IconButton>
      )}
      {props.children}
    </MuiDialog>
  );
};

const useStyles = makeStyles({
  paper: {
    width: '50rem',
    minHeight: '50rem',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.08)',
    borderRadius: '8px',
  },
});

export default Dialog;
