import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../constants';
import { getAuthorizationStatus } from '../mock/auth-status';

type LayoutStateCartage = [string, string, boolean];

const getLayoutState = (pathName: AppRoute): LayoutStateCartage => {

  switch(pathName){
    case AppRoute.Main:
      return ['page page--gray page--main','header__logo-link header__logo-link--active',true];
      break;
    case AppRoute.Login:
      return ['page page--gray page--login','header__logo-link',false];
      break;
    default:
      return ['page','header__logo-link',true];
      break;
  }

};

export default function Layout () {

  const {pathname} = useLocation();
  const [mainClassName,linkClassName,shouldRenderUser] = getLayoutState(pathname as AppRoute);
  const authorizationStatus: AuthorizationStatus = getAuthorizationStatus();

  return(
    <div className={mainClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className= {linkClassName}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {shouldRenderUser ?
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {authorizationStatus === AuthorizationStatus.Auth ? (
                        <>
                          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                          <span className="header__favorite-count">3</span>
                        </>) : <span className="header__login">Sign in</span>}
                    </Link>
                  </li>
                  {authorizationStatus === AuthorizationStatus.Auth ? (
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>) : null}
                </ul>
              </nav> : null}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );

}
