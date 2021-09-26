import { lazy } from 'react';

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
const EditAppointment = lazy(() =>
  import('./pages/appointment/edit-appointment/EditAppointment'),
);

export const routes = [
  { path: '/', component: <div></div> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/appointment/:userId', component: <Appointment /> },
  {
    path: '/appointment/:action?/authenticate/:userId',
    component: <CustomerAuthentication />,
  },
  {
    path: '/appointment/insert/:userId',
    component: <NewAppointment />,
  },
  {
    path: '/appointment/edit/:userId',
    component: <EditAppointment />,
  },
];

export const protectedRoutes = [
  { path: '/calendar', component: <Calendar /> },
  { path: '/business-information', component: <BusinessInformation /> },
];
