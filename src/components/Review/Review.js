import React from 'react'
import "./Review.scss"

const Review = (props) => {

    return (
        <div className="review-component">
            <div className="review-info">
                <span className="name"> {props.review.name}</span>
                <span className="no-of-reviews">{props.review.noOfReviews} de recenzii</span>
                <div className="stars-wrapper">
                    <div className="stars-container">
                        {Array(5).fill(1).map((el, i) =>
                            <img key={i} src={i >= props.review.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                        )}
                    </div>
                </div>
                <p>{props.review.text}</p>
            </div>
            <div className="horizontal-divider" />
            <div className="evaluate-review">
                <span>Evaleaza recenzia</span>
                <div className="thumbs-container">
                    <img src="/images/icons/Thumbs_up.svg" />
                    {props.review.thumbsUp}
                </div>
                <div className="thumbs-container">
                    <img src="/images/icons/Thumbs_down.svg" />
                    {props.review.thumbsDown}
                </div>
            </div>
        </div>
    );
}

export default Review;
