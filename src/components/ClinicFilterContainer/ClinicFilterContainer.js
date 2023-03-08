import React from 'react'
import "./ClinicFilterContainer.scss"
import Carousel from '../Carousel/Carousel';
const ClinicFilterContainer = (props) => {

    return (
        <div className="clinic-filter-container">
            <div className="info-container">
                <div className="rating-container">
                    <img className="clinic-img" src={props.clinic.image} />
                    <div className="score-wrapper">
                        {props.clinic.score}
                    </div>
                    <div className="reviews">
                        {props.clinic.noOfReviews} recenzii
                    </div>
                    <div className="stars-wrapper">
                        <div className="stars-container">
                            {Array(5).fill(1).map((el, i) =>
                                <img key={i} src={i >= props.clinic.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-container">
                    <div className="title">{props.clinic.name}</div>
                    <div className="specialties">{props.clinic.specialty}</div>
                    <div className="type">{props.clinic.type}</div>
                    {props.clinic.contact && <div className="contact-wrapper">
                        {props.clinic.contact.map((el, i) =>
                            <div className="contact" key={i}>
                                <img alt={el.type} src={`/images/icons/${el.type}.svg`} />
                                <span>{el.value}</span>
                            </div>)}
                    </div>}
                </div>
            </div>
            {props.clinic.reviews && <div className="reviews-container">
                    <Carousel content={props.clinic.reviews} fullReview />
            </div>}
        </div>
    );
}

export default ClinicFilterContainer;
