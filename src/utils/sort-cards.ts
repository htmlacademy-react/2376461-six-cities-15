import { SORT_TYPES, SortTypesType } from '../constants';
import { typeCard } from '../types';

export function sortCards(sortType: SortTypesType, offers: typeCard[]) {
  switch (sortType) {
    case SORT_TYPES.Popular:
      return offers;
    case SORT_TYPES.PriceASC:
      return offers.sort((a, b) => a.price - b.price);
    case SORT_TYPES.PriceDESC:
      return offers.sort((a, b) => b.price - a.price);
    case SORT_TYPES.Rating:
      return offers.sort((a, b) => b.rating - a.rating);
  }
}
//i
