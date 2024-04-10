import { Link, useNavigate } from 'react-router-dom';
import { typeCard } from '../../types';
import { AppRoute, AuthorizationStatus, CitiesType, LOCATIONS } from '../../constants';
import { changeFavoriteStatus } from '../../store/thunk/offers';
import { useAppDispatch } from '../../store/helpers';
import { changeIsFavorite } from '../../store/slices/offers';
import { useAuth } from '../../hooks/use-auth';
import { memo } from 'react';
import { setCity } from '../../store/slices/app';

type cardProps = {
  card: typeCard;
  handleHover: (offer?: typeCard) => void;
}

const CardOffer = memo(({ card, handleHover }: cardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAuth() === AuthorizationStatus.Auth;
  const {id,isFavorite,isPremium,previewImage,price,rating,title,type} = card;
  const favoriteStatus = isFavorite ? 0 : 1;

  const handleCityChange = (city: CitiesType) => {
    dispatch(setCity(city));
  };

  const handleMouseEnter = () => {
    handleHover(card);
  };
  const handleMouseExit = () => {
    handleHover();
  };

  const handleChangeFavorite = () => {
    if(!isAuthorized){
      navigate(AppRoute.Login);
      return;
    }
    const payload = {
      offerId: id,
      status: favoriteStatus
    };

    dispatch(changeFavoriteStatus(payload));
    dispatch(changeIsFavorite({offerId:id,favoriteStatus:favoriteStatus}));
  };

  return(
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      {isPremium &&
    <div className="place-card__mark">
      <span>Premium</span>
    </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link onClick={() => handleCityChange(LOCATIONS.Paris)} to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src= {previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleChangeFavorite} className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick={() => handleCityChange(LOCATIONS.Paris)} to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );

});

CardOffer.displayName = 'CardOffer';

export default CardOffer;
