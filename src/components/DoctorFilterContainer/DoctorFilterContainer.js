import React from 'react'
import "./DoctorFilterContainer.scss"
import Carousel from '../Carousel/Carousel';
import { useNavigate } from "react-router-dom";
import { API_URL_MEDIA, routes } from "../../utils/routes";

const DoctorFilterContainer = (props) => {
    const navigate = useNavigate();
    const { doctor, displayReviews = false } = props
    return (
        <div className="clinic-filter-container">
            <div className="info-container" onClick={() => { navigate(routes.DOCTOR_PAGE + `/?id=${doctor.id}`) }}>
                <div className="rating-container">
                    <img className="clinic-img" src={!doctor.image ? '/images/user.svg' : doctor?.image?.includes('http') ? doctor.image : API_URL_MEDIA + doctor.image} />
                    {doctor.average_rating > 0 && <div className="score-wrapper desktop">
                        {Math.floor(doctor.average_rating * 2)}
                    </div>}
                    <div className="reviews desktop">
                        {doctor.reviews.length || 0} recenzii
                    </div>
                    <div className="stars-wrapper desktop">
                        <div className="stars-container">
                            {Array(5).fill(1).map((el, i) =>
                                <img key={i} src={i >= doctor.average_rating || 0 ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-container">
                    <div className="title">{doctor.first_name + " " + doctor.last_name}</div>
                    <div className="type">{doctor.academic_degree[0].label || "Medic Primar"} {doctor.collaborator_clinic[0]?.clinic_name ? ` - ${doctor.collaborator_clinic[0].clinic_name}` : ""}</div>
                    <div className="type">{doctor.speciality[0].label || ""}</div>
                </div>
            </div>
            {displayReviews && doctor.reviews.length>0 &&
                <React.Fragment>
                    <div className="line-separator mobile"></div>
                    <div className="reviews-container">
                        <Carousel content={doctor.reviews} fullReview />
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

export default DoctorFilterContainer;
