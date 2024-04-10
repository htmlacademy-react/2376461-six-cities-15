import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import ErrorPage from './error-page';
import { capitalizedWord } from '../utils/utils';
import { Map } from '../components/map';
import OfferReviews from '../components/review/offer-reviews';
import { fetchOffer } from '../store/thunk/offer';
import { useAppDispatch, useAppSelector } from '../store/helpers';
import { offerSelectors } from '../store/slices/offer';
import { fetchNearby } from '../store/thunk/nearby';
import { fetchAllComments } from '../store/thunk/comments';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../constants';
import Spinner from '../components/spinner/spinner';
import CardNearPlace from '../components/card/card-near-place';
import { changeFavoriteStatus } from '../store/thunk/offers';
import { useAuth } from '../hooks/use-auth';
import { changeIsFavorite } from '../store/slices/offers';


export default function OfferPage() {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const isAuthorized = useAuth() === AuthorizationStatus.Auth;
  const currentOffer = useAppSelector(offerSelectors.offer);
  const [isFavorite, setIsFavorite] = useState(false);
  const status = useAppSelector(offerSelectors.offerStatus);
  const nearOffersFetched = useAppSelector(offerSelectors.nearby);
  const comments = useAppSelector(offerSelectors.comments);

  useEffect(() => {

    dispatch(fetchOffer(id as string));
    dispatch(fetchNearby(id as string));
    dispatch(fetchAllComments(id as string));
  },[dispatch,id]);

  useEffect(() => {
    if (currentOffer) {
      setIsFavorite(currentOffer.isFavorite);
    }
  }, [currentOffer]);

  if(status === RequestStatus.Loading){
    return <Spinner/>;
  }

  if(!currentOffer){
    return <ErrorPage />;
  }

  const handleChangeFavorite = () => {
    if(!isAuthorized){
      navigate(AppRoute.Login);
      return;
    }
    const payload = {
      offerId: id as string,
      status: isFavorite ? 0 : 1
    };

    setIsFavorite(!isFavorite);
    dispatch(changeFavoriteStatus(payload)).unwrap().then(()=>{
      dispatch(changeIsFavorite({offerId:id as string,favoriteStatus: isFavorite ? 0 : 1}));
    });
  };

  const nearOffers = [currentOffer,...nearOffersFetched.slice(0,3)];
  const nearCards = nearOffersFetched.slice(0,3).map((item) => <CardNearPlace key={item.id} card={item} />);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer?.images.map((item) => (
              <Fragment key={item}>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src= {item} alt="Photo studio"/>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer.title}
              </h1>
              <button onClick={handleChangeFavorite} className={`offer__bookmark-button ${isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizedWord(currentOffer.type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((item) => (
                  <Fragment key={item}>
                    <li className="offer__inside-item">
                      {item}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src= {currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">
                  {currentOffer.host.name}
                </span>
                <span className="offer__user-status">
                  {currentOffer.host.isPro && 'Pro'}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <OfferReviews comments={comments}/>
          </div>
        </div>
        <Map className="offer__map map" city={currentOffer.city} activeOfferId={currentOffer.id} offers={nearOffers}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearCards}
          </div>
        </section>
      </div>
    </main>
  );
}
