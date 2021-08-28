import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, IconButton } from '@material-ui/core';

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
        >
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
