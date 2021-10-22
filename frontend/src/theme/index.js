import { createTheme } from "@mui/material";
import globalStyles from "./globalStyles";

export default createTheme({
  direction: "rtl",
  typography: {
    htmlFontSize: 10,
    fontFamily: "Heebo",
  },
  palette: {
    primary: {
      main: "#265FB1",
      light: "#D5E6FF",
    },
    secondary: {
      main: "#FFB462",
    },
    error: {
      main: "#F97575",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: globalStyles,
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          margin: "0 auto",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          maxHeight: "calc(100% - 31px)",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        daySelected: {
          backgroundColor: "none",
          color: "#265FB1",
          border: "1px solid #265FB1",
          "&:hover": {
            backgroundColor: "none",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "& .MuiPickersTimePickerToolbar-ampmSelection .MuiPickersToolbarText-toolbarBtnSelected":
            {
              border: "1px solid white",
              padding: ".5rem",
            },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&$error": {
            margin: "2px 0",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: ".5rem 0",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: "1.8rem",
        },
        h1: {
          fontSize: "4rem",
        },
        h2: {
          fontSize: "1.8rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        label: {
          fontSize: "1.8rem",
          fontWeight: "normal",
          color: "#265FB1",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.8rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1.8rem",
        },
      },
    },
  },
});
