import { ReactNode } from 'react';
import CardFavorite from './card-favorite';
import { typeCard } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

type placesProps = {
  name: string;
  locations: typeCard[];
};

export default function FavoritePlaces({name,locations}: placesProps): ReactNode {

  const cards = locations.map((item) => <CardFavorite key={item.id} card={item} />);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`${AppRoute.Main}`}>
            <span>{name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {cards}
      </div>
    </li>
  );
}
