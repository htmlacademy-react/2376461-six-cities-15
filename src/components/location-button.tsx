
import { CitiesType } from '../constants';
import { LocationButtonType } from '../types';
import { useAppDispatch } from '../store/helpers';
import { changeCityAction } from '../store/actions';

export default function LocationButton ({ name, isActive }: LocationButtonType): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: CitiesType): void => {
    dispatch(changeCityAction(city));
  };

  return(
    <li className="locations__item">
      <a onClick={() => handleCityChange(name)} className={isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
        <span>{name}</span>
      </a>
    </li>
  );

}
