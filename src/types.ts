
type typeLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type typeCity = {
  name: string;
  location: typeLocation;
};

type typeHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type typeUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type typeComment = {
  id: string;
  date: string;
  user: typeUser;
  comment: string;
  rating: number;
}

type typeCard = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  city: typeCity;
  location: typeLocation;
};
type typeOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: typeCity;
  location: typeLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: typeHost;
  images: [string];
  maxAdults: number;
  }

type LocationButtonType = {
  name: string;
  isActive: boolean;
};

export type { LocationButtonType, typeCard, typeOffer, typeLocation, typeCity, typeUser, typeComment };
