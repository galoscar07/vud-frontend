import React from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicPage.scss";

const initClinic = {
    name: 'Clinica de pediatrie',
    imgUrl: 'https://www.shutterstock.com/shutterstock/photos/212251981/display_1500/stock-photo-modern-hospital-style-building-212251981.jpg',
    score: 8.4,
    rating: 4,
    noOfReviews: 641,
    address: "Str. Zagazului nr. 7, Bucuresti",
    typeOfClinic: "Clinica privata",
    facilities: ["Store", "Bank", "Bus", "Cafeteria"],
    links: [
        { type: "Facebook", value: 'https://www.facebook.com' },
        { type: "Linkedin", value: 'https://www.facebook.com' },
        { type: "Youtube", value: 'https://www.facebook.com' },
        { type: "Whatsapp", value: 'https://www.facebook.com' },
    ],
    contact: [
        { type: "urgente", value: "0219646", icon: "emergency" },
        { type: "call center", value: "0218383", icon: "phone" },
        { type: "receptie", value: "0721345987", icon: "phone" },
        { type: "email", value: "spitalulmedlifepediatrie@medlife.ro", icon: "email" },
        { type: "email", value: "spitalulmedlifepediatrie@medlife.ro", icon: "email" },
        { type: "website", value: "www.medlife.ro", icon: "website" }
    ],
    isFavorite: false,
}

function ClinicPage() {
    const [clinic, setClinic] = React.useState(initClinic);
    const [isFavoriteClinic, setIsFavoriteClinic] = React.useState(clinic.isFavorite);

    const toggleFavoriteClinic = (toggleState) => {
        setIsFavoriteClinic(toggleState);
        setClinic((prevState) => ({ ...prevState, isFavorite: isFavoriteClinic }))
    }
    return (
        <div className="clinic-page">
            <div className="clinic-header-container">
                <div className="clinic-container">
                    <div className="image-container">
                        <img src={clinic.imgUrl} alt="clinic-logo" />
                        <div className="rating">{clinic.score}</div>
                    </div>
                    <div className="info-container">
                        <div className="flex-wrapper">
                            <div className="title-wrapper">
                                <span className="type">{clinic.typeOfClinic}</span>
                                <span className="name">{clinic.name}</span>
                                <span className="address">{clinic.address}</span>
                            </div>
                            <div>
                                <div className="links-wrapper">
                                    {clinic.links.map((link, i) =>
                                        <div className="link">
                                            <img key={i} alt={link.type} src={`/images/icons/${link.type}.svg`} />
                                        </div>
                                    )}
                                </div>
                                <div className="favorite-button" onClick={() => toggleFavoriteClinic(!isFavoriteClinic)}>
                                    <img src={clinic.isFavorite ? "/images/icons/favorite.svg" : "/images/icons/favorite_checked.svg"} />
                                    {clinic.isFavorite ? "Salveaza la favorite" : "Clinica favorita"}
                                </div>
                            </div>
                        </div>
                        <div className="rating-container">
                            <div className="upper-flex">
                                <div className="stars-wrapper">
                                    <span>{clinic.noOfReviews} recenzii</span>
                                    <div className="stars-container">
                                        {Array(5).fill(1).map((el, i) =>
                                            <img key={i} src={i >= clinic.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                        )}
                                    </div>
                                </div>
                                <div className="see-reviews">Vezi toate recenziile</div>
                            </div>
                            <div className="facilities">
                                <span>Facilitati clinica</span>
                                <div>
                                    {clinic.facilities.map((facility, i) =>
                                        <img key={i} alt={facility} src={`/images/facilities/${facility}.svg`} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-container">

                    {clinic.contact.map((el, i) =>
                        <div className={`contact-card ${el.icon === 'emergency' && 'emergency'}`} key={i}>
                            <img alt={"contact-icon"} src={`/images/icons/${el.icon}.svg`} />
                            <div>
                                <span className="type">{el.type}</span>
                                <span>{el.value}</span>
                            </div>

                        </div>)}
                </div>
            </div>
            <div className="info-right-container">
                <div className="col">
                    <Dropdown />
                </div>
                <div className="col-2">
                    <Dropdown/>
                    <Dropdown/>
                </div>
            </div>
        </div>
    );
}

export default ClinicPage;
