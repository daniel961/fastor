import makeStyles from '@mui/styles/makeStyles';

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
