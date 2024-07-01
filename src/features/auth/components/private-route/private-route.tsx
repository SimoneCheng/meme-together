import { Route, Redirect, useLocation } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { useIsAuthenticated } from '../../store';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const location = useLocation();
  const [isAuthenticated] = useIsAuthenticated();

  return (
    <Route {...rest}>
      {isAuthenticated ? children : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
