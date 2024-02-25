import CardOffer from '../components/card-offer';
import LocationButton from '../components/location-button';
import PlacesSortForm from '../components/places-sort-form';

import { typeCard } from '../types';

export default function MainPage ({data}: {data: typeCard[]}): JSX.Element {

  const cardList = data.map((item) => (
    <CardOffer key={item.id} {...item} />
  ));

  return(
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <LocationButton key={0} name="Paris" isActive = {false} />
            <LocationButton key={1} name="Cologne" isActive = {false} />
            <LocationButton key={2} name="Brussels" isActive = {false} />
            <LocationButton key={3} name="Amsterdam" isActive />
            <LocationButton key={4} name="Hamburg" isActive = {false} />
            <LocationButton key={5} name="Dusseldorf" isActive = {false} />
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <PlacesSortForm />
            <div className="cities__places-list places__list tabs__content">
              {cardList}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}
