import { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Routers
import { BrowserRouter as Router } from "react-router-dom";

// Theming & RTL
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { StylesProvider } from "@mui/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Moment & datepickers
import { LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import moment from "moment";
import "moment/locale/he";
import "moment-timezone";

// Context's
import LoaderState from "./context/loader/LoaderState";

moment.locale("he");
moment.tz("Asia/Jerusalem");

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <RTL>
      <Suspense fallback={"loading..."}>
        <Router>
          <LocalizationProvider dateAdapter={AdapterMoment} locale="he">
            <StylesProvider injectFirst>
              <LoaderState>
                <CssBaseline />
                <App />
              </LoaderState>
            </StylesProvider>
          </LocalizationProvider>
        </Router>
      </Suspense>
    </RTL>
  </MuiThemeProvider>,
  document.getElementById("root")
);
