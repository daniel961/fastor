import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Routers
import { BrowserRouter as Router } from 'react-router-dom';

// Theming & RTL
import {
  jssPreset,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles';
import theme from './theme';
import { create } from 'jss';
import rtl from 'jss-rtl';
import CssBaseline from '@material-ui/core/CssBaseline';

// Moment & datepickers
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
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
  <Suspense fallback={'loading...'}>
    <Router>
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale='he'
      >
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <RTL>
                <CssBaseline />
                <App />
              </RTL>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </MuiPickersUtilsProvider>
    </Router>
  </Suspense>,
  document.getElementById('root'),
);
