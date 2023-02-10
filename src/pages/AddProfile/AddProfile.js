import React from 'react'
import "./AddProfile.scss"

const AddProfile = () => {
    const cards = [
        {
            icon: 'images/doctor.svg',
            title: 'Medic',
        },
        {
            icon: 'images/unit.svg',
            title: 'Unitate medicală'
        }
    ]
    return (
        <div className="add-profile-page">
            <h1>Adaugă pagină de profil pentru:</h1>
            <div className="profiles-container">
                {cards.map((card, i) =>
                    <div className="profile-card" key={i}>
                        <img src={card.icon}/>
                        <span>{card.title}</span>
                        <div className="button border-button">Adaugă</div>
                    </div>)}
            </div>
        </div>
    );
}

export default AddProfile;
