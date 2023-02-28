import React from 'react'
import "./Review.scss"
const review = {
    name: "Dorina Margarit",
    noOfReviews: 22,
    rating: 5,
    text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!",
    thumbsUp: 4,
    thumbsDown: 2
}
const Review = () => {

    return (
        <div className="review-component">
            <span className="name"> {review.name}</span>
            <span className="no-of-reviews">{reviews.noOfReviews} de recenzii</span>
            <p>{review.text}</p>
            <div className="horizontal-divider"/>
            <div className="evaluate-review">
                <span>Evaleaza recenzia</span>
                <div className="thumbs-container">
                <img src="/images/icons/Thumbs_up.svg"/>
                    {review.thumbsUp}
                </div>
                <div className="thumbs-container">
                    <img src="/images/icons/Thumbs_down.svg"/>
                    {review.thumbsDown}
                </div>
            </div>
        </div>
    );
}

export default Review;
