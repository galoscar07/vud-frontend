import React from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Dropdown from '../../components/Dropdown/Dropdown';
import Review from '../../components/Review/Review';
import "./ClinicPage.scss";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'bannana', label: 'Bannana' },
]
const testimonials = [
    {
        text: "“Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!”"
    },
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis nisl diam. Vivamus venenatis ornare risus non ornare. Proin fermentum aliquam felis, placerat fermentum nunc luctus in. Pellentesque et quam lacus."
    }
]

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
const reviews = [{
    name: "Dorina Margarit",
    noOfReviews: 22,
    rating: 5,
    text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!",
    thumbsUp: 4,
    thumbsDown: 2
},
{
    name: "Charles Leclerc",
    noOfReviews: 22,
    rating: 5,
    text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!",
    thumbsUp: 4,
    thumbsDown: 2
},
]

//TODO move the key to env
const key='AIzaSyDB6F9-1tJ-Zfs-G1tEiTwmti7oc0Rj3aU'
// TODO get coordinates from api
const defaultLocation = { lat: 46.7621044, lng: 23.6114846 };
const MapUrl = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${defaultLocation.lat}, ${defaultLocation.lng}`;

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
            <div className="col-2">

                <div className="info-left-container">
                    <div className="container-title">Testimoniale</div>
                    <Carousel content={testimonials} />
                    <h1>{defaultLocation.lat}</h1>
                    <iframe
                        center={defaultLocation}
                        title={'google maps'}
                        src={`${MapUrl}`}
                        width="100%"
                        height="210"
                        frameBorder="0"
                        style={{ border: 0, marginTop: 5 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </div>

                <div className="info-right-container">
                    <div className="container-title">Cautare</div>
                    <div className="col">
                        <Dropdown options={options} title={"Specialitati"} />
                    </div>
                    <div className="col-2">
                        <Dropdown options={options} title={"Oras"} />
                        <Dropdown options={options} title={"Clinica"} />
                    </div>
                    <div className="description-container">
                        <p>Cabinetul nostru Stomatologic situat pe Şoseaua Mihai Bravu nr. 67-73, bloc C18, oferă servicii de înaltă calitate în domeniul stomatologic, cu accent pe Chirurgie Orală, Estetică și Protetică Dentară, Endodontie și Protetică și Parodontologie. Echipa noastră de medici stomatologi cu experiență își propune să ofere fiecărui pacient tratamente personalizate, adaptate nevoilor și dorințelor acestuia.</p>
                        <p>Suntem dedicați să oferim un mediu cald și prietenos, cu tehnologie de ultimă generație, pentru a face experiența pacientului cât mai confortabilă și eficientă. În plus, ne străduim să păstrăm un nivel ridicat de igienă și sterilizare, pentru a garanta sănătatea pacienților noștri.</p>
                        <p>Serviciile noastre includ, dar nu sunt limitate la, tratamente de albire dentală, implante dentare, coroane și punți dentare, obturatii de canal, tratamente parodontale, precum și chirurgie orală și extracții dentare. De asemenea, ne concentrăm pe prevenirea și îngrijirea dentară, oferind consultații și recomandări pacienților noștri pentru a-și păstra sănătatea dentară pe termen lung.</p>
                        <p>Așteptăm cu interes să ne întâlnim cu dumneavoastră și să vă oferim servicii stomatologice de calitate superioară. Contactați-ne astăzi pentru a programa o consultație și a începe călătoria către o zâmbet sănătos și strălucitor!</p>
                    </div>
                </div>

            </div>

            <div className="reviews-container">
                <div className="container-title">Ce spun pacientii</div>
                {reviews.map((review, i) =>
                    <Review key={i} review={review} />)}
            </div>
        </div>
    );
}

export default ClinicPage;
