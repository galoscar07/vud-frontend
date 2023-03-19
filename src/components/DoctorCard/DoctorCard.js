import React from 'react'
import "./DoctorCard.scss"

const DoctorCard = (props) => {
    return (
        <div className="doctor-card-component">
            <img className="profile" src={props.doctor.photo} />
            <div className="text-container">
                <div className="title">{props.doctor.name}</div>
                <div className="academic-wrapper">
                  <div className="degree">{props.doctor.academic_degree.map((el) => el.label).join(', ')}</div>
                </div>
                <div className="specialties-wrapper">
                    <div className="spec">{props.doctor.speciality.map((el) => el.label).join(', ')}</div>
                </div>
              {props.doctor.link &&
                <div className="location-wrapper">
                  <img src={"/images/icons/email.svg"} />
                  <div className="location">{props.doctor.link}</div>
                </div>
              }
            </div>
        </div>
    );
}

export default DoctorCard;

