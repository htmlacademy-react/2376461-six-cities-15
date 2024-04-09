import { AppRoute, LOCATIONS } from '../constants';
import FavoritePlaces from '../components/card/favorite-places';
import { useAppDispatch, useAppSelector } from '../store/helpers';
import { fetchFavoriteOffers } from '../store/thunk/offers';
import { useEffect } from 'react';
import { offersSelectors } from '../store/slices/offers';
import { Link } from 'react-router-dom';
import FavoritesEmpty from '../components/favorites-empty';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  },[dispatch]);

  const favoritesList = useAppSelector(offersSelectors.favorites);

  const locationsList = Object.keys(LOCATIONS).map((locationName) => {
    const currentLocations = favoritesList.filter((item) => item.city.name === locationName);

    if(currentLocations.length > 0){
      return <FavoritePlaces key={locationName} name={locationName} locations={currentLocations}/>;
    }
  });

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesList.length > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {locationsList}
              </ul>
            </section> : <FavoritesEmpty/>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={`${AppRoute.Main}`}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </>
  );
}
