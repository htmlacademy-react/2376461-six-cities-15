import { Fragment, memo, useState } from 'react';
import { SORT_TYPES, SortTypesType } from '../constants';
import { useAppDispatch } from '../store/helpers';
import { setSort } from '../store/slices/app';


const PlacesSortForm = memo(({ currentSort }: { currentSort: SortTypesType }): JSX.Element => {

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleCityChange = (sort: SortTypesType): void => {
    dispatch(setSort(sort));
    setIsOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const placesOptions = Object.values(SORT_TYPES).map((item) => (
    <Fragment key={item}>
      <li onClick={() => handleCityChange(item)} className={`places__option${item === currentSort ? ' places__option--active' : ''}`} tabIndex={0}>{item}</li>
    </Fragment>
  ));

  return(
    <form onClick={toggleDropdown} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {placesOptions}
        </ul>
      )}
    </form>
  );
});

PlacesSortForm.displayName = 'PlacesSortForm';

export default PlacesSortForm;
