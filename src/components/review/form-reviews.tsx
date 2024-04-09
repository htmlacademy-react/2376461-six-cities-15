import { FormEvent, Fragment, MouseEventHandler, ReactEventHandler, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { postComment } from '../../store/thunk/comments';
import { offerActions, offerSelectors } from '../../store/slices/offer';
import { RequestStatus } from '../../constants';

type typeChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function ReviewsForm () {

  const [review, setReview] = useState({rating: 0, review: ''});
  const formRef = useRef<HTMLFormElement>(null);
  const currentOffer = useAppSelector(offerSelectors.offer);
  const commentStatus = useAppSelector(offerSelectors.commentStatus);

  const dispatch = useAppDispatch();

  const handlePostComment: MouseEventHandler<HTMLButtonElement> = (evt: FormEvent<EventTarget>) => {
    evt.preventDefault();
    dispatch(offerActions.setCommentStatus(RequestStatus.Loading));

    dispatch(postComment({
      rating: Number(review.rating),
      comment: review.review.toString(),
      offerId: currentOffer?.id
    })).unwrap().then(() => {
      setReview({
        rating: 0,
        review: '',
      });
      formRef.current?.reset();
    });

  };

  const handleChange: typeChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;
    setReview({...review, [name]: value});
  };

  const rating = [
    {value: 5, label: 'perfect'},
    {value: 4, label: 'good'},
    {value: 3, label: 'not bad'},
    {value: 2, label: 'badly'},
    {value: 1, label: 'terribly'},
  ];

  return(
    <form ref={formRef} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({value,label}) => (
          <Fragment key={value}>
            <input
              disabled = {commentStatus !== RequestStatus.Idle}
              className="form__rating-input visually-hidden"
              name="rating"
              value= {value}
              id = {`${value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title= {label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea disabled = {commentStatus !== RequestStatus.Idle} onChange={handleChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button onClick={handlePostComment} className="reviews__submit form__submit button" type="submit" disabled = {review.review.length < 50 || review.review.length > 300 || review.rating === 0 || commentStatus !== RequestStatus.Idle}>Submit</button>
      </div>
    </form>
  );
}
