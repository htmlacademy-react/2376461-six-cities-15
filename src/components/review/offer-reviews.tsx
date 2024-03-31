import { commentsData } from '../../mock/comments-data';
import ReviewList from './reviews-list';
import { AuthorizationStatus } from '../../constants';
import { getAuthorizationStatus } from '../../mock/auth-status';
import { typeOffer } from '../../types';
import ReviewsForm from './form-reviews';

export default function OfferReviews(offer: typeOffer) {

  const isAuth = getAuthorizationStatus();
  const comments = commentsData.filter((item) => item.id === offer.id);

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {isAuth === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );

}
