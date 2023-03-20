import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Dropdown from '../../components/Dropdown/Dropdown';
import Review from '../../components/Review/Review';
import "./ClinicPage.scss";

import { API_MAP, getAPILink } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import { flatten } from 'lodash';


function ClinicPage({ props }) {

    const [clinic, setClinic] = React.useState({});
    const [loading, setLoading] = React.useState(true)
    const [isReviewFormDisplayed, setIsReviewFormDisplayed] = React.useState(false)
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
            name: serverClinic?.clinic_name,
            imgUrl: serverClinic?.profile_picture || "/images/unit.svg",
            score: serverClinic?.average_rating * 2 || 0,
            noOfReviews: serverClinic?.review_count || 0,
            rating: serverClinic?.average_rating || 0,
            address: `Str. ${serverClinic?.clinic_street} nr. ${serverClinic?.clinic_number}, ${serverClinic?.clinic_town}`,
            typeOfClinic: serverClinic?.medical_unit_types?.map((mut) => { return mut.label }).join(", "),
            facilities: serverClinic?.unity_facilities?.map((mut) => { return mut.label }),
            links: [
                { type: "Facebook", value: serverClinic.website_facebook || null },
                { type: "Linkedin", value: serverClinic.website_linkedin || null },
                { type: "Youtube", value: serverClinic.website_youtube || null },
                { type: "Google", value: serverClinic.website_google || null },
                { type: "Whatsapp", value: serverClinic.whatsapp || null },
            ],
            contact: [
                serverClinic.secondary_email && { ...serverClinic?.secondary_email?.split('|').map((sc) => { return { type: "email", value: sc, icon: "email" } }) },
                { type: "email", value: serverClinic?.primary_email, icon: "email" },
                { type: "website", value: serverClinic?.website, icon: "website" },
                serverClinic.secondary_phone && JSON.parse(serverClinic.secondary_phone).map((el) => { return { type: el[0], value: el[1], icon: "phone" } })
            ],
            testimonials: serverClinic?.reviews?.map((re) => {
                return {
                    text: re.comment,
                }
            }).slice(0, 4),
            reviews: serverClinic?.reviews?.map((re) => {
                return {
                    name: re.name,
                    rating: re.rating,
                    text: re.comment,
                }
            }),
            description: serverClinic?.description,
            doctors: serverClinic?.collaborator_doctor?.map((doc) => {
                return {
                    photo: doc.profile_picture,
                    name: doc.doctor_name,
                    academic_degree: doc.academic_degree,
                    speciality: doc.speciality,
                    medical_skill: doc.medical_skill,
                    link: doc.link,
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
    const flattenedResponse = (el) =>
        el.flatMap((item) => {
            if (Array.isArray(item)) {
                return item;
            } else {
                return [item];
            }
        });
    const [selectedSpecialties, setSelectedSpecialties] = React.useState([]);
    const [selectedDegrees, setSelectedDegrees] = React.useState([]);
    const [selectedCompetences, setSelectedCompetences] = React.useState([]);
    const [filteredDoctors, setFilteredDoctors] = React.useState([]);


    const handleSubmitCompetences = (selected) => {
        setSelectedCompetences(selected)
        console.log(selected, selectedCompetences, 'competences')
    }
    const handleSubmitDegrees = (selected) => {
        setSelectedDegrees(selected)
        console.log(selected, selectedDegrees, 'grade')
    }
    const handleSubmitSpecialties = (selected) => {
        setSelectedSpecialties(selected)
        console.log(selected, selectedSpecialties, 'spec')
    }

    const handleContactType = (el, i, isMobile) => {
        switch (el.type) {
            case "email":
                return (
                    <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                        {el?.icon && <img alt={"contact-icon"} src={`/images/icons/email.svg`} />}
                        <div>
                            <span className="type">{el?.type}</span>
                            <a href={`mailto:${el.value}`}>{el.value}</a>
                        </div>
                    </div>
                )
            case "website":
                return (
                    <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                        {el?.icon && <img alt={"contact-icon"} src={`/images/icons/website.svg`} />}
                        <div>
                            <span className="type">{el?.type}</span>
                            <a href={el.value.includes('http') ? el.value : `http://${el.value}`}>{el?.value}</a>
                        </div>
                    </div>
                )
            case "emergency":
            case "ambulance":
                return (
                    <div className={`contact-card emergency ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                        {el?.icon && <img alt={"contact-icon"} src={`/images/icons/emergency.svg`} />}
                        <div>
                            <span className="type">{el?.type}</span>
                            <a href={`tel:${el.value}`}>{el.value}</a>
                        </div>
                    </div>
                )
            case "fax":
                return (
                    <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                        {el?.icon && <img alt={"contact-icon"} src={`/images/icons/fax.svg`} />}
                        <div>
                            <span className="type">{el?.type}</span>
                            <a href={`tel:${el.value}`}>{el.value}</a>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                        {el?.icon && <img alt={"contact-icon"} src={`/images/icons/phone.svg`} />}
                        <div>
                            <span className="type">{el?.type}</span>
                            <a href={`tel:${el.value}`}>{el.value}</a>
                        </div>
                    </div>
                )
        }
    }

    useEffect(() => {

    }, [selectedCompetences, selectedDegrees, selectedSpecialties])

    const renderClinicHeaderDesktop = () => {
        return (
            <div className="clinic-header-container">
                <div className="clinic-container">
                    <div className="image-container">
                        <img src={clinic.imgUrl} alt="clinic-logo" />
                        {clinic.score > 0 && <div className="rating">{clinic.score}</div>}
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
                                    {clinic?.links?.map((link, i) =>
                                        <a href={link.value && link.value.includes('http') ? link.value : `http://${link.value}`} target={"_blank"} rel="noreferrer" className={`link ${!link.value && 'hide'}`}>
                                            <img key={i} alt={link.type} src={`/images/icons/${link.type}.svg`} />
                                        </a>
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
                                {clinic?.reviews?.length > 0 && <div onClick={scrollingTop} className="see-reviews">Vezi toate recenziile</div>}
                            </div>
                            <div className="facilities">
                                <span>Facilitati clinica</span>
                                <div>
                                    {clinic?.facilities?.map((facility, i) =>
                                        <img key={i} alt={facility} src={`/images/facilities/${facility}.svg`} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-container">
                    {clinic.contact && flattenedResponse(clinic.contact).map((el, i) =>
                        <React.Fragment>
                            {handleContactType(el, i)}
                        </React.Fragment>
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
                    {clinic.contact && flattenedResponse(clinic.contact).map((el, i) =>
                        <React.Fragment>
                            {handleContactType(el, i, true)}
                        </React.Fragment>
                    )}
                </div>
                <div className="view-more-btn" onClick={() => setDisplayMoreCards(!displayMoreCards)}>
                    {displayMoreCards ? 'Vezi toate datele de contact' : 'Afiseaza mai putin'}
                </div>
                <div className="reviews-container">
                    <div className="stars-wrapper">
                        {clinic.score > 0 && <div className="rating">{clinic.score}</div>}
                        <span>{clinic.noOfReviews} recenzii</span>
                        <div className="stars-container">
                            {Array(5).fill(1).map((el, i) =>
                                <img key={i} src={i >= clinic.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                            )}
                        </div>
                    </div>
                    {clinic?.reviews?.length > 0 && <div onClick={scrollingTop} className="view-reviews">Vezi toate recenziile</div>}
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
                                {clinic?.testimonials?.length > 0 && <React.Fragment>
                                    <div className="container-title">Testimoniale</div>
                                    <Carousel onScroll={scrollingTop} content={clinic.testimonials} /></React.Fragment>}
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
                            </div>

                            <div className="info-right-container">
                                <div className="container-title">Cautare</div>
                                <div className="col">
                                    <Dropdown options={specialities} title={"Specialitati"} onSelect={handleSubmitSpecialties} />
                                </div>
                                <div className="col-2">
                                    <Dropdown options={academicDegreesDropDown} title={"Grade academice"} onSelect={handleSubmitDegrees} />
                                    <Dropdown options={competences} title={"Competente medicale"} onSelect={handleSubmitCompetences} />
                                </div>
                                <div style={{ marginBottom: '20px' }} className="col">
                                    {clinic.doctors && clinic.doctors.map((doc, i) =>
                                        <DoctorCard doctor={doc} key={i} />
                                    )}
                                </div>
                                {clinic.description && <div className="description-container">
                                    <p>
                                        {clinic.description}
                                    </p>

                                </div>}
                            </div>

                        </div>

                        <div className="reviews-container " ref={targetElement}>
                            {clinic?.reviews?.length > 0 && <div className="container-title">Ce spun pacientii</div>}
                            {clinic?.reviews?.map((review, i) =>
                                <Review key={i} review={review} />)}
                        </div>


                        <div className="add-review-wrapper">
                            {!isReviewFormDisplayed
                                ?
                                <button onClick={() => setIsReviewFormDisplayed(true)} className={`button border-button round`}>Adauga recenzie</button>
                                :
                                <React.Fragment>
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
                                                    <span onClick={() => setReview({ ...review, rating: { value: i + 1 } })} key={i} >
                                                        <img src={i >= review.rating.value ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                                    </span>)}
                                            </div>
                                        </div>

                                        <button className={`button border-button round ${!formValid ? 'disabled' : ''}`}>Adauga recenzie</button>
                                        {
                                            review.server.error &&
                                            <div className={'error'}>Ceva a mers rau! Va rugam incercati mai tarziu.</div>
                                        }
                                    </form>
                                </React.Fragment>
                            }
                        </div>
                    </React.Fragment>
            }
        </div>
    );
}

export default ClinicPage;
