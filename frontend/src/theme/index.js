import { createTheme } from '@material-ui/core';

export default createTheme({
  direction: 'rtl',
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: '#265FB1',
      light: '#D5E6FF',
    },
    secondary: {
      main: '#FFB462',
    },
    error: {
      main: '#F97575',
    },
  },
  overrides: {
    MuiDialogActions: {
      root: {
        margin: '0 auto',
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: 'calc(100% - 31px)',
      },
    },
    MuiToolbar: {
      root: {
        '& .MuiPickersTimePickerToolbar-ampmSelection .MuiPickersToolbarText-toolbarBtnSelected':
          {
            border: '1px solid white',
            padding: '.5rem',
          },
      },
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          margin: '2px 0',
        },
      },
    },
    MuiFormControl: {
      root: {
        margin: '.5rem 0',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '1.8rem',
      },
      h1: {
        fontSize: '4rem',
      },
      h2: {
        fontSize: '1.8rem',
      },
    },
    MuiButton: {
      label: {
        fontSize: '1.8rem',
        fontWeight: 'normal',
        color: '#265FB1',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '1.8rem',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '1.8rem',
      },
    },
  },
});
