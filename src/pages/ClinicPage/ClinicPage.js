import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Dropdown from '../../components/Dropdown/Dropdown';
import Review from '../../components/Review/Review';
import "./ClinicPage.scss";

import { API_MAP, getAPILink } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import HQCard from '../../components/HQCard/HQCard';
import DoctorCard from '../../components/DoctorCard/DoctorCard';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'bannana', label: 'Bannana' },
]

function ClinicPage({ props }) {

    const [clinic, setClinic] = React.useState({});
    const [loading, setLoading] = React.useState(true)
    const [id, setId] = React.useState(null)
    const [error, setError] = React.useState('');
    const [displayMoreCards, setDisplayMoreCards] = React.useState(true);
    const [formValid, setFormValid] = React.useState(false)
    const [review, setReview] = React.useState({
        email: {
            value: '',
            error: null
        },
        name: {
            value: '',
            error: null
        },
        rating: {
            value: 0,
            error: null,
        },
        comment: {
            value: '',
            error: null
        }, server: {
            error: null
        }
    })

    const isFormEmpty = () => {
        if (review.email.value && review.name.value && review.comment.value && review.rating.value) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }
    const handleChange = (event) => {
        setReview({ ...review, [event.target.name]: { ...review[event.target.name], value: event.target.value } })
        isFormEmpty()
    }

    const handleAddReview = (event) => {
        event.preventDefault();
        fetch(
            getAPILink(API_MAP.ADD_REVIEW + id), {
            method: 'POST',
            body: JSON.stringify({
                rating: review.rating.value,
                comment: review.comment.value,
                name: review.name.value,
                email: review.email.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error
                }
                return response.json()
            })
            .then((data) => {
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError("Ceva nu a funcționat. Vă rugăm să încercați în câteva minute")
            })
    }

    const targetElement = useRef();
    const scrollingTop = (event) => {
        const elmnt = targetElement;
        elmnt.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
        });
    };

    const mapServerRespToFront = (serverClinic) => {
        return {
            id: serverClinic.id,
            name: serverClinic.clinic_name,
            imgUrl: serverClinic.profile_picture,
            score: 8.4, // TODO
            rating: 4, // TODO
            noOfReviews: 641, // TODO
            address: `Str. ${serverClinic.clinic_street} nr. ${serverClinic.clinic_number}, ${serverClinic.clinic_town}`,
            typeOfClinic: serverClinic.medical_unit_types.map((mut) => { return mut.label }).join(", "),
            facilities: serverClinic.unity_facilities.map((mut) => { return mut.label }),
            links: [
                { type: "Facebook", value: serverClinic.website_facebook },
                { type: "Linkedin", value: serverClinic.website_linkedin },
                { type: "Youtube", value: serverClinic.website_youtube },
                { type: "Whatsapp", value: serverClinic.website_google },
            ],
            contact: [
                ...serverClinic.secondary_email.split('|').map((sc) => { return { type: "email", value: sc, icon: "email" } }),
                { type: "email", value: serverClinic.primary_email, icon: "email" },
                { type: "website", value: serverClinic.website, icon: "website" },
                { type: "call center", value: serverClinic.primary_phone, icon: "phone" },
                ...serverClinic.secondary_phone.split('|').map((sc, index) => { return { type: `tel. ${index + 1}`, value: sc, icon: "phone" } }),
            ],
            testimonials: serverClinic.reviews.map((re) => {
                return {
                    text: re.comment,
                }
            }).slice(0, 4),
            reviews: serverClinic.reviews.map((re) => {
                return {
                    name: re.name,
                    rating: re.rating,
                    text: re.comment,
                }
            }),
            description: serverClinic.description,
            hqs: serverClinic.clinic_offices.map((hq) => {
                return {
                    photo: hq.profile_picture,
                    link: hq.link,
                    name: hq.name,
                    medical_unit_types: hq.medical_unit_types,
                    address: hq.address,
                }
            }),
            doctors: serverClinic.collaborator_doctor.map((doc) => {
                return {
                    photo: doc.profile_picture,
                    name: doc.doctor_name,
                    academic_degree: doc.academic_degree,
                    speciality: doc.speciality,
                    medical_skill: doc.medical_skill,
                    //TODO in response we don't have address
                    address: "",
                }
            })
        }
    }

    const [academicDegreesDropDown, setAcademicDegreesDropDown] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [competences, setCompetences] = useState([])

    useEffect(() => {
        const query = window.location.search
        const queryParams = new URLSearchParams(query)
        const id = queryParams.get('id')
        setId(id);
        fetch(
            getAPILink(API_MAP.GET_CLINICS + id + '/'), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false)
                setClinic(mapServerRespToFront(res))
            })
        fetch(getAPILink(API_MAP.GET_ACADEMIC_DEGREES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setAcademicDegreesDropDown(mapped)
            })
            .catch((err) => {
                console.log(err)
            })
        fetch(getAPILink(API_MAP.GET_SPECIALITIES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setSpecialities(mapped)
            })
            .catch((err) => {
                console.log(err)
            })
        fetch(getAPILink(API_MAP.GET_COMPETENCES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setCompetences(mapped)
            })
            .catch((err) => {
                console.log(err)
            })

        // TODO populate the dropdowns and name accordingly
        // TODO filter the list of doctors after these things


    }, [])

    const renderClinicHeaderDesktop = () => {
        return (
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
                                <div onClick={scrollingTop} className="see-reviews">Vezi toate recenziile</div>
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
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderClinicHeaderMobile = () => {
        return (
            <div className="clinic-header-mobi">
                <div className="header-container">
                    <div className="container">
                        <div className="image-container">
                            <img src={clinic.imgUrl} alt="clinic-logo" />
                        </div>
                        <div className="text-container">
                            <span className="type">{clinic.typeOfClinic}</span>
                            <span className="name">{clinic.name}</span>
                        </div>
                    </div>

                </div>
                <div className="contact-container">
                    {clinic.contact.map((el, i) =>
                        <div className={`contact-card ${el.icon === 'emergency' && 'emergency'} ${displayMoreCards && i > 1 && 'hide'}`} key={i}>
                            <img alt={"contact-icon"} src={`/images/icons/${el.icon}.svg`} />
                            <div>
                                <span className="type">{el.type}</span>
                                <span>{el.value}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="view-more-btn" onClick={() => setDisplayMoreCards(!displayMoreCards)}>
                    {displayMoreCards ? 'Vezi toate datele de contatc' : 'Afiseaza mai putin'}
                </div>
                <div className="reviews-container">
                    <div className="stars-wrapper">
                        <div className="rating">{clinic.score}</div>
                        <span>{clinic.noOfReviews} recenzii</span>
                        <div className="stars-container">
                            {Array(5).fill(1).map((el, i) =>
                                <img key={i} src={i >= clinic.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                            )}
                        </div>
                    </div>
                    <div onClick={scrollingTop} className="view-reviews">Vezi toate recenziile</div>
                </div>
            </div>
        )
    }
    return (
        <div className="clinic-page">
            {
                loading
                    ? <LoadingSpinner />
                    : <React.Fragment>
                        <div className="desktop">{renderClinicHeaderDesktop()}</div>
                        <div className="mobi">{renderClinicHeaderMobile()}</div>
                        <div className="col-2">
                            <div className="info-left-container ">

                                <div className="doctors-container">
                                    {clinic.doctors.map((doc, i) =>
                                        <DoctorCard doctor={doc} key={i} />
                                    )}
                                </div>

                                <div className="container-title">Testimoniale</div>
                                <Carousel onScroll={scrollingTop} content={clinic.testimonials} />
                                <iframe
                                    title={'google maps'}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="210"
                                    frameBorder="0"
                                    style={{ border: 0, marginTop: 5 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                />
                                <div className="container-title">Sedii</div>
                                <div className="hqs-container">
                                    {clinic.hqs.map((hq, i) =>
                                        <HQCard hq={hq} key={i} />
                                    )}
                                </div>
                            </div>

                            <div className="info-right-container">
                                <div className="container-title">Cautare</div>
                                <div className="col">
                                    <Dropdown options={specialities} title={"Specialitati"} />
                                </div>
                                <div className="col-2">
                                    <Dropdown options={academicDegreesDropDown} title={"Grade academice"} />
                                    <Dropdown options={competences} title={"Competente medicale"} />
                                </div>
                                <div className="description-container">
                                    <p>
                                        {clinic.description}
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="reviews-container " ref={targetElement}>
                            <div className="container-title">Ce spun pacientii</div>
                            {clinic.reviews.map((review, i) =>
                                <Review key={i} review={review} />)}
                        </div>


                        <div className="add-review-wrapper">
                            <div className="container-title">Adauga o recenzie</div>
                            <form onSubmit={handleAddReview} autoComplete="off" className="add-review-form">
                                <label>Nume</label>
                                <input className="full-width" type="text" name="name" value={review.name.value}
                                    onChange={handleChange} onBlur={isFormEmpty} />
                                <label>Email</label>
                                <input className="full-width" type="email" name="email" value={review.email.value}
                                    onChange={handleChange} onBlur={isFormEmpty} />
                                <label>Recenzie</label>
                                <textarea rows="6" className="full-width" type="comment" name="comment" value={review.comment.value}
                                    onChange={handleChange} onBlur={isFormEmpty} />
                                <label>Rating</label>
                                <div className="stars-wrapper">
                                    <div className="stars-container">
                                        {Array(5).fill(1).map((el, i) =>
                                            <span onClick={() => setReview({ ...review, rating: { value: i + 1 } })}  >
                                                <img key={i} src={i >= review.rating.value ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                            </span>)}
                                    </div>
                                </div>

                                <button className={`button border-button round ${!formValid ? 'disabled' : ''}`}>Adauga recenzie</button>
                                {
                                    review.server.error &&
                                    <div className={'error'}>Ceva a mers rau! Va rugam incercati mai tarziu.</div>
                                }
                            </form>
                        </div>
                    </React.Fragment>
            }
        </div>
    );
}

export default ClinicPage;
