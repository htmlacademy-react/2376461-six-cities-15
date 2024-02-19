
import { LocationButtonType } from '../types';

export default function LocationButton ({ name, isActive }: LocationButtonType): JSX.Element {

  return(
    <li className="locations__item">
      <a className={isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
        <span>{name}</span>
      </a>
    </li>
  );

}
