import React from 'react'
import "./DoctorCard.scss"

const DoctorCard = (props) => {
    return (
        <div className="doctor-card-component">
            <img src={props.doctor.photo} />
            <div className="text-container">
                <div className="title">{props.doctor.name}</div>
                <div className="academic-wrapper">
                    {props.doctor.academic_degree.map((deg) =>
                        <div className="degree">{deg}</div>)}
                </div> 
                <div className="specialties-wrapper">
                    {props.doctor.speciality.map((spec) =>
                        <div className="spec">{spec}</div>)}
                </div>
                <div className="location-wrapper">
                    <img src={"/images/icons/location.svg"} />
                    <div className="location">{props.doctor.address}</div>
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;

