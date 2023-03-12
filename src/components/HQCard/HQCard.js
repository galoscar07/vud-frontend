import React from 'react'
import "./HQCard.scss"

const HQCard = (props) => {
    return (
        <div className="hq-card-component">
            <img className="profile" src={props.hq.photo} />
            <div className="text-container">
                <div className="title">{props.hq.name}</div>
                <div className="types-wrapper">
                    {props.hq.medical_unit_types.map((type, i) =>
                        <div key={i} className="type">{type.label}</div>)}
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
