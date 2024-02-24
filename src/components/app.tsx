import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from './private-route';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import ErrorPage from '../pages/error-page';
import { AppRoute } from '../constants';
import { cardsData } from '../mock/card-data';
import { AuthorizationStatus } from '../constants';

export default function App (): JSX.Element {


  return(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element = {<MainPage data={ cardsData }/>}/>
        <Route path={AppRoute.Login} element = {<LoginPage/>}/>
        <Route path={AppRoute.Favorites} element = {
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element = {<OfferPage/>}/>
        <Route path='*' element = {<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );

}
