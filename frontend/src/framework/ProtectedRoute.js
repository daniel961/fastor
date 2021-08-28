import React, { useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';

const ProtectedRoute = ({ component, exact, path }) => {
  const history = useHistory();
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies.get('token'),
  );
  const Component = component;

  const tokenExpiredDate = cookies.get('token-expired-date');

  if (tokenExpiredDate) {
    const now = moment().format('YYYY-MM-DD');
    const isAfter = moment(now).isAfter(tokenExpiredDate, 'day');

    if (isAfter) {
      setIsAuthenticated(false);
      cookies.remove('token');
      cookies.remove('token-expired-date');
      history.push('/login');
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <Route path={path} exact={exact}>
          {Component}
        </Route>
      ) : (
        <Redirect to='/login' />
      )}
    </>
  );
};

export default ProtectedRoute;
