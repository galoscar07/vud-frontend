import React from 'react'
import "./ClinicFilterContainer.scss"
import Carousel from '../Carousel/Carousel';
import {useNavigate} from "react-router-dom";
import {API_URL_MEDIA, routes} from "../../utils/routes";

const ClinicFilterContainer = (props) => {
    const navigate = useNavigate();

    return (
        <div className="clinic-filter-container">
            <div className="info-container" onClick={() => { navigate(routes.CLINIC_PAGE + `/?id=${props.clinic.id}`) }}>
                <div className="rating-container">
                    <img className="clinic-img" src={props.clinic?.image?.includes('http') ? props.clinic.image : API_URL_MEDIA + props.clinic.image || '/images/unit.svg'} />
                    {props.clinic.score > 0 && <div className="score-wrapper">
                        {props.clinic.score}
                    </div>}
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
                            <div className={`contact ${!el?.value && 'hide'}`} key={i}>
                                <img alt={el.type} src={`/images/icons/${el.type}.svg`} />
                                <span>{el.value}</span>
                            </div>)}
                    </div>}
                </div>
            </div>
            {props.displayReviews && <div className="reviews-container">
                <Carousel content={props.clinic.reviews} fullReview />
            </div>}
        </div>
    );
}

export default ClinicFilterContainer;
