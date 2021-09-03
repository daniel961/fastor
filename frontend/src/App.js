import { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './framework/ProtectedRoute';
import { Navbar } from './components';

// Routes
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const Calendar = lazy(() => import('./pages/calendar/Calendar'));
const BusinessInformation = lazy(() =>
  import('./pages/business-information/BusinessInformation'),
);
const Appointment = lazy(() => import('./pages/appointment/Appointment'));
const CustomerAuthentication = lazy(() =>
  import('./pages/appointment/customer-authentication/CustomerAuthentication'),
);
const NewAppointment = lazy(() =>
  import('./pages/appointment/new-appointment/NewAppointment'),
);

const routes = [
  { path: '/', component: <div></div> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/appointment/:userId', component: <Appointment /> },
  {
    path: '/appointment/authenticate/:userId',
    component: <CustomerAuthentication />,
  },
  {
    path: '/appointment/insert/:userId',
    component: <NewAppointment />,
  },
];

const protectedRoutes = [
  { path: '/calendar', component: <Calendar /> },
  { path: '/business-information', component: <BusinessInformation /> },
];

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        {routes.map(route => {
          return (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          );
        })}

        {protectedRoutes.map(route => {
          return (
            <ProtectedRoute
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          );
        })}

        <Route path='/404'>
          <div>NOT FOUND</div>
        </Route>
        <Redirect from='*' to='/404' />
      </Switch>
    </>
  );
};

export default App;
