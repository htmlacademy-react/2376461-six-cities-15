import { cardsData } from '../mock/card-data';
import { LOCATIONS } from '../constants';
import FavoritePlaces from '../components/card/favorite-places';

export default function FavoritesPage() {
  const favoritesList = cardsData.filter((item) => item.isFavorite === true);


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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {locationsList}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </>
  );
}
