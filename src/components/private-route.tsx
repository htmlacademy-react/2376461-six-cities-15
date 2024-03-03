import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  authorizationStatus: string;
  isReverse?: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): ReactNode {
  const {authorizationStatus,isReverse, children} = props;

  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Main : AppRoute.Login} />
  );
}

export default PrivateRoute;
