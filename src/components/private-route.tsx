import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus,isReverse, children} = props;

  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Main : AppRoute.Login} />
  );
}

export default PrivateRoute;
