import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './framework/ProtectedRoute';
import { Navbar } from './components';
import { protectedRoutes, routes } from './routes';

const App = () => {
  const history = useHistory();
  const showNavbar = !history?.location?.pathname?.includes('/appointment/');

  return (
    <>
      {showNavbar && <Navbar />}
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
