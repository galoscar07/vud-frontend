import React from 'react'
import "./HQCard.scss"

const HQCard = (props) => {
    return (
        <div className="hq-card-component">
            <img src={props.hq.photo} />
            <div className="text-container">
                <div className="title">{props.hq.name}</div>
                {/* TODO SPECIALTIES?? */}
                {/* <div className="specialties-wrapper">
                    {props.hq.specialties.map((spec) =>
                        <div className="specialty">{spec}</div>)}
                </div> */}
                <div className="types-wrapper">
                    {props.hq.medical_unit_types.map((type, i) =>
                        <div key={i} className="type">{type}</div>)}
                </div>
                <div className="location-wrapper">
                    <img src={"/images/icons/location.svg"} />
                    <div className="location">{props.hq.address}</div>
                </div>
            </div>
        </div>
    );
}

export default HQCard;
