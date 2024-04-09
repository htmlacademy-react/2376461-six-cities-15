import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from './private-route';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import ErrorPage from '../pages/error-page';
import { AppRoute } from '../constants';
import Layout from './layout';
import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { getToken } from '../api/token';
import { checkAuth } from '../store/thunk/auth';
import { useAppDispatch } from '../store/helpers';

export default function App (): JSX.Element {
  const dispatch = useAppDispatch();
  const token = getToken();
  const authStatus = useAuth();
  useEffect(() => {
    if(token){
      dispatch(checkAuth());
    }
  },[token,dispatch]);

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {<Layout />}
        >
          <Route index element = {<MainPage/>}/>
          <Route path={AppRoute.Login} element = {
            <PrivateRoute authorizationStatus={authStatus} isReverse>
              <LoginPage/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Favorites} element = {
            <PrivateRoute authorizationStatus={authStatus}>
              <FavoritesPage/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Offer}:id`} element = {<OfferPage/>}/>
        </Route>
        <Route path='*' element = {<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );

}
