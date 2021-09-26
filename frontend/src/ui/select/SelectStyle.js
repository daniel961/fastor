import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: "28rem",
    '&:focus': {
      background: 'none',
    },
  },
  menu: {
    '& .MuiList-root': {
      '& .MuiListItem-root.Mui-focusVisible': {
        background: 'rgba(38, 95, 177, 0.1)',
      },
      '& .Mui-selected': {
        background: theme.palette.primary.main,
        color: 'white',
      },
      '& .MuiListItem-button': {
        '&:hover': {
          background: 'rgba(38, 95, 177, 0.1)',
        },
      },
    },
  },
}));
