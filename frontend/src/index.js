import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Routers
import { BrowserRouter as Router } from 'react-router-dom';

// Theming & RTL
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles';
import theme from './theme';
import { create } from 'jss';
import rtl from 'jss-rtl';
import CssBaseline from '@mui/material/CssBaseline';

// Moment & datepickers
import { LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import moment from 'moment';
import 'moment/locale/he';
import 'moment-timezone';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

moment.locale('he');
moment.tz('Asia/Jerusalem');

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={'loading...'}>
        <Router>
          <LocalizationProvider dateAdapter={AdapterMoment} locale='he'>
            <StylesProvider injectFirst>
              <ThemeProvider theme={theme}>
                <GlobalStyles />
                <RTL>
                  <CssBaseline />
                  <App />
                </RTL>
              </ThemeProvider>
            </StylesProvider>
          </LocalizationProvider>
        </Router>
      </Suspense>
    </MuiThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root'),
);
