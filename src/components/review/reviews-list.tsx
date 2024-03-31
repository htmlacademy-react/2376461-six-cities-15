import { typeComment } from '../../types';
import ReviewItem from './review-item';

export default function ReviewList({comments}: {comments: typeComment[]}) {

  const commentsList = comments.map((comment) => (
    <ReviewItem
      key={comment.id + (Math.random() * 19)}
      comment={comment}
    />
  ));

  return(
    <ul className="reviews__list">
      {commentsList}
    </ul>
  );

}
