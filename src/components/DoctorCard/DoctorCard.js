import React from 'react'
import "./DoctorCard.scss"

const DoctorCard = (props) => {
    return (
        <div className="doctor-card-component">
            <img className="profile" src={props.doctor.photo} />
            <div className="text-container">
                <div className="title">{props.doctor.name}</div>
                <div className="academic-wrapper">
                    {props.doctor.academic_degree.map((deg, i) =>
                        <div key={i} className="degree">{deg.label}</div>)}
                </div>
                <div className="specialties-wrapper">
                    {props.doctor.speciality.map((spec, i) =>
                        <div key={i} className="spec">{spec.label}</div>)}
                </div>
                <div className="location-wrapper">
                    <img src={"/images/icons/email.svg"} />
                    <div className="location">{props.doctor.link}</div>
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;

