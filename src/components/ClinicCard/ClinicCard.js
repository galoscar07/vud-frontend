import React from 'react'
import "./ClinicCard.scss"

const ClinicCard = (props) => {
    return (
        <div className="clinic-card-component">
            <img className="profile" src={props.clinic.photo} />
            <div className="text-container">
                <div className="info">
                    <div className="title">{props.clinic.name}</div>
                    <div className="type">{props.clinic.medical_unit_type}</div>
                    <div className="location">
                        <img src={"/images/icons/location.svg"} />
                        {props.clinic.address}
                    </div>
                </div>
                {props.clinic.phone &&
                    <div className="contact">
                        <div className="schedule">Programează consultație</div>
                        <div className="phone">
                            <img src={"/images/icons/phone.svg"} />
                            <a href={`tel:${props.clinic.phone}`}>{props.clinic.phone}</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ClinicCard;

