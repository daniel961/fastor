// import { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './framework/ProtectedRoute';

const routes = [{ path: '/', component: <div></div> }];

const protectedRoutes = [
  { path: '/protected-example', component: <div></div> },
];

const App = () => {
  return (
    <>
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
