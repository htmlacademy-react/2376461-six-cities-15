import { typeComment } from '../../types';
import ReviewItem from './review-item';

export default function ReviewList({comments}: {comments: typeComment[]}) {

  const commentsSorted = [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,10);

  const commentsList = commentsSorted.map((comment) => (
    <ReviewItem
      key={comment.id}
      comment={comment}
    />
  ));

  return(
    <ul className="reviews__list">
      {commentsList}
    </ul>
  );

}
