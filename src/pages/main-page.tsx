import { useState } from 'react';
import CardOffer from '../components/card/card-offer';
import LocationButton from '../components/location-button';
import PlacesSortForm from '../components/places-sort-form';

import { typeCard } from '../types';
import { Nullable } from 'vitest';
import { LOCATIONS } from '../constants';
import { Map } from '../components/map';
import { useAppSelector } from '../store/helpers';
import { sortCards } from '../utils/sort-cards';

export default function MainPage ({data}: {data: typeCard[]}): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Nullable<typeCard>>(null);
  const currentCity = useAppSelector((state) => state.currentCity);
  const currentSort = useAppSelector((state) => state.currentSort);

  const handleHoverOnCard = (offer?: typeCard): void => {
    setActiveOffer(offer || null);
  };
  const filteredDataByCity = data.filter((item) => item.city.name === currentCity);
  const sortedCards = sortCards(currentSort,filteredDataByCity);

  const cardList = sortedCards.map((cardItem) => (
    <CardOffer
      key={cardItem.id}
      card={cardItem}
      handleHover={handleHoverOnCard}
    />
  ));
  const buttonList = Object.keys(LOCATIONS).map((item) => <LocationButton key={item} name={item} isActive = {currentCity === item} />);

  //В результате работы 36 строки образуется визуальный баг - синяя полоса сверху. Очеь интересно почему так
  return(
    <main className= {`page__main page__main--index ${filteredDataByCity.length === 0 ? 'cities__places-container--empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {buttonList}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredDataByCity.length} place{filteredDataByCity.length > 1 ? 's' : ''} to stay in Amsterdam</b>
            <PlacesSortForm currentSort={currentSort}/>
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
