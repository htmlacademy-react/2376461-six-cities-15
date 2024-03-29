import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from './private-route';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import ErrorPage from '../pages/error-page';
import { AppRoute } from '../constants';
import { cardsData } from '../mock/card-data';
import Layout from './layout';
import { getAuthorizationStatus } from '../mock/auth-status';

export default function App (): JSX.Element {


  return(
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {<Layout />}
        >
          <Route index element = {<MainPage data={ cardsData }/>}/>
          <Route path={AppRoute.Login} element = {
            <PrivateRoute authorizationStatus={getAuthorizationStatus()} isReverse>
              <LoginPage/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Favorites} element = {
            <PrivateRoute authorizationStatus={getAuthorizationStatus()}>
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
