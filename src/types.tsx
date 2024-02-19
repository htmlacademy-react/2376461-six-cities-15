type CardType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

type LocationButtonType = {
  name: string;
  isActive: boolean;
};

export type { CardType, LocationButtonType };
