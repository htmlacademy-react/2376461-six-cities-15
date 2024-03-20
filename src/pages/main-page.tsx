import { useState } from 'react';
import CardOffer from '../components/card/card-offer';
import LocationButton from '../components/location-button';
import PlacesSortForm from '../components/places-sort-form';


import { typeCard } from '../types';
import { Nullable } from 'vitest';
import { LOCATIONS } from '../constants';
import { Map } from '../components/map';

export default function MainPage ({data}: {data: typeCard[]}): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Nullable<typeCard>>(null);

  const handleHoverOnCard = (offer?: typeCard): void => {
    setActiveOffer(offer || null);
  };

  const cardList = data.map((cardItem) => (
    <CardOffer
      key={cardItem.id}
      card={cardItem}
      handleHover={handleHoverOnCard}
    />
  ));
    //В результате работы 36 строки образуется визуальный баг - синяя полоса сверху. Очеь интересно почему так
  return(
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.keys(LOCATIONS).map((item) => <LocationButton key={item} name={item} isActive = {false} />)}
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
            <Map className='cities__map map' city={data[0].city} offers={data} activeOfferId={activeOffer?.id} key={'map'}/>
          </div>
        </div>
      </div>
    </main>
  );
}
