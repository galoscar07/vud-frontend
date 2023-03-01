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
const Review = (props) => {

    return (
        <div className="review-component">
            <span className="name"> {props.review.name}</span>
            <span className="no-of-reviews">{props.review.noOfReviews} de recenzii</span>
            <p>{props.review.text}</p>
            <div className="horizontal-divider"/>
            <div className="evaluate-review">
                <span>Evaleaza recenzia</span>
                <div className="thumbs-container">
                <img src="/images/icons/Thumbs_up.svg"/>
                    {props.review.thumbsUp}
                </div>
                <div className="thumbs-container">
                    <img src="/images/icons/Thumbs_down.svg"/>
                    {props.review.thumbsDown}
                </div>
            </div>
        </div>
    );
}

export default Review;
