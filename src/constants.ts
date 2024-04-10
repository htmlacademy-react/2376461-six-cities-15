okexport const LOCATIONS = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};
export type CitiesType = typeof LOCATIONS[keyof typeof LOCATIONS];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

export const AuthorizationStatus = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;
export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export type SortTypesType = typeof SORT_TYPES[keyof typeof SORT_TYPES];

export const SORT_TYPES = {
  Popular: 'Popular',
  PriceASC: 'Price: low to high',
  PriceDESC: 'Price: high to low',
  Rating: 'Top rated first',
} as const;

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const enum RequestStatus { Idle, Loading, Success, Failed}
