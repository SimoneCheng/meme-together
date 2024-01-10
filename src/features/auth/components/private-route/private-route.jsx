import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.userData);
  const location = useLocation();

  return (
    <Route {...rest}>
      {userData ? children : (
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
