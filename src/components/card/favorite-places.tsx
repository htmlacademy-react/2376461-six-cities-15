import { ReactNode, memo } from 'react';
import CardFavorite from './card-favorite';
import { typeCard } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute, CitiesType } from '../../constants';
import { setCity } from '../../store/slices/app';
import { useAppDispatch } from '../../store/helpers';

type placesProps = {
  name: string;
  locations: typeCard[];
};

const FavoritePlaces = memo(({ name, locations }: placesProps): ReactNode => {
  const dispatch = useAppDispatch();
  const handleCityChange = (city: CitiesType) => {
    dispatch(setCity(city));
  };
  const cards = locations.map((item) => <CardFavorite key={item.id} card={item} />);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link onClick={() => handleCityChange(name)} className="locations__item-link" to={`${AppRoute.Main}`}>
            <span>{name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {cards}
      </div>
    </li>
  );
});

FavoritePlaces.displayName = 'FavoritePlaces';

export default FavoritePlaces;
