import { makeStyles } from '@material-ui/core/styles';

export const useTextFieldStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      minWidth: '28rem',
      '& svg': {
        marginRight: '1rem',
      },
    },
  },
}));
