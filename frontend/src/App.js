import { useContext } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./framework/ProtectedRoute";
import { Navbar } from "./components";
import { protectedRoutes, routes } from "./routes";
import { LoaderContext } from "./context/loader/LoaderState";
import { StyledBlockUI } from "./components/styled";
import "react-block-ui/style.css";

const App = () => {
  const { loading, message } = useContext(LoaderContext);
  const history = useHistory();
  const showNavbar = !history?.location?.pathname?.includes("/appointment/");

  return (
    <StyledBlockUI tag="div" blocking={loading} message={message} keepInView>
      {showNavbar && <Navbar />}
      <Switch>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          );
        })}

        {protectedRoutes.map((route) => {
          return (
            <ProtectedRoute
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          );
        })}

        <Route path="/404">
          <div>NOT FOUND</div>
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </StyledBlockUI>
  );
};

export default App;
