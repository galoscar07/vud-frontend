import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Review from '../../components/Review/Review';
import {API_MAP, getAPILink, REACT_RECAPTCHA_KEY} from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./DoctorPage.scss";
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import ClinicCard from '../../components/ClinicCard/ClinicCard';
import { useNavigate } from "react-router-dom";
import { routes } from '../../utils/routes';
import ReCAPTCHA from "react-google-recaptcha";

const label_ads = [
    'doctorpage_1', 'doctorpage_2', 'doctorpage_3'
]

const default_adds = {
    'doctorpage_1': {
        id: 1,
        href: 'https://www.google.com',
        alt: 'add-1',
        photo: "/images/ads/ad1.svg",
        size: '437x437',
    },
    'doctorpage_2': {
        id: 2,
        href: 'https://www.google.com',
        alt: 'add-1',
        photo: "/images/ads/add5.svg",
        size: '437x437',
    },
    'doctorpage_3': {
        id: 3,
        href: 'https://www.google.com',
        alt: 'add-1',
        photo: "/images/ads/add2.svg",
        size: '90x728',
    }
}

function DoctorPage() {
    const [doctor, setDoctor] = React.useState({ testimonials: [], collaborator_doctors: [], collaborator_clinics: [] });
    const [loading, setLoading] = React.useState(true)
    const [isReviewFormDisplayed, setIsReviewFormDisplayed] = React.useState(false)
    const [id, setId] = React.useState(null)
    const displayMoreCards = true
    const [formValid, setFormValid] = React.useState(false)
    const [addsToDisplay, setAddsToDisplay] = useState({})

    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptcha = (key) => {
        setCaptchaValue({
            captcha: true,
            'g-recaptcha-response': key
        })
    };
    const recaptchaRef = React.createRef()

    // Review
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
        },
        isReviewSubmitted: false,
        maxLength: 500,
        server: {
            error: null
        }
    })
    const targetElement = useRef();
    const scrollingTop = () => {
        targetElement.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
        });
    };
    const isFormEmpty = () => {
        if (review.email.value && review.name.value && review.comment.value) {
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
        if (!captchaValue) {
            setReview({ ...review, server: {...review.server, error: "Captcha nu a fost completat"} })
            return
        }
        fetch(
            getAPILink(API_MAP.ADD_REVIEW_DOCTOR + id), {
            method: 'POST',
            body: JSON.stringify({
                rating: review.rating.value === 0 ? 1 : review.rating.value,
                comment: review.comment.value,
                name: review.name.value,
                email: review.email.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    throw Error
                }
                setReview({ ...review, isReviewSubmitted: true })
                return response.json()
            })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const flattenedResponse = (el) =>
        el.flatMap((item) => {
            if (Array.isArray(item)) {
                return item;
            } else {
                return [item];
            }
        });

    const mapServerRespToFront = (res) => {
        return {
            id: res.id,
            name: res.first_name + " " + res.last_name,
            imageUrl: res.profile_picture || "/images/user.svg",
            score: res.average_rating * 2 || 0,
            noOfReviews: res.review_count || 0,
            rating: res.average_rating || 0,
            links: [
                { type: "Facebook", value: res.website_facebook },
                { type: "Linkedin", value: res.website_linkedin },
                { type: "Youtube", value: res.website_youtube },
                { type: "Google", value: res.website_google },
                { type: "Whatsapp", value: res.whatsapp },
            ],
            contact: [
                { type: 'Telefon', value: res.primary_phone, icon: "phone" },
                { type: "email", value: res.primary_email, icon: "email" },
                { type: "website", value: res.website, icon: "website" },
            ],
            testimonials: res.reviews?.map((el) => { return { text: el.comment } }).slice(0, 4) || [],
            reviews: res.reviews?.map((el) => {
                return {
                    name: el.name,
                    rating: el.rating,
                    text: el.comment
                }
            }) || [],
            about: res.description,
            competences: res.medical_skill?.map((el) => { return el.label }) || [],
            specialities: res.speciality?.map((el) => { return el.label }) || [],
            degrees: res.academic_degree?.map((el) => { return el.label }) || [],
            collaborator_doctors: res.collaborator_doctor?.map((doc) => {
                return {
                    link: "/doctor-page/?id=" + doc.id,
                    first_name: doc.first_name,
                    last_name: doc.last_name,
                    photo: doc.profile_picture || null,
                    speciality: doc.speciality || [],
                    rating: doc.average_rating || 0,
                    noOfReviews: doc.review_count || 0,
                    score: doc.average_rating * 2 || 0,

                }
            }),
            collaborator_clinics: res.collaborator_clinic?.map((clinic) => {
                return {
                    link: "/clinic-page/?id=" + clinic.id,
                    name: clinic.clinic_name,
                    photo: clinic.profile_picture,
                    address:
                        (clinic?.clinic_street ? clinic.clinic_street + " " : "") +
                        (clinic?.clinic_number ? clinic.clinic_number + " " : "") +
                        (clinic?.clinic_other_details ? clinic.clinic_other_details + " " : "") +
                        (clinic?.clinic_town ? clinic.clinic_town + " " : "") +
                        (clinic?.clinic_county ? clinic.clinic_county : ""),
                    medical_unit_type: clinic.medical_unit_types?.map((el) => { return el.label }) || [],
                    phone: clinic.primary_phone,
                }
            })
        }
    }

    useEffect(() => {
        const jsonArray = JSON.parse(localStorage.getItem('ads'));
        const filteredAds = jsonArray.filter(item => item.location.includes('clinicpage'));
        let dictAdds = {}
        for (const label of label_ads) {
            const exists = filteredAds.find((el) => el.location === label)
            if (exists) {
                dictAdds[label] = exists
            } else {
                dictAdds[label] = default_adds[label]
            }
        }
        setAddsToDisplay(dictAdds)

        const query = window.location.search
        const queryParams = new URLSearchParams(query)
        const id = queryParams.get('id')
        setId(id);
        fetch(
            getAPILink(API_MAP.GET_DOCTOR_BY_ID + id + '/'), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((res) => {
                if (res.status === 404) {
                    // navigate(routes.NOT_FOUND)
                }
                return res.json()
            })
            .then((res) => {
                setLoading(false)
                const mapped = mapServerRespToFront(res)
                setDoctor(mapped)
            })
    }, [])

    const navigate = useNavigate();
    const goToRedeem = () =>
        navigate({
            pathname: routes.HOW_TO_REDEEM_DOCTOR,
            search: `?id=${id}`,
        });

    const handleContactType = (el, i, isMobile) => {
        if (el && el.value && el.type) {
            switch (el.type) {
                case "email":
                    return (
                        <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                            {el?.icon && <img alt={"contact-icon"} src={`/images/icons/email.svg`} />}
                            <div>
                                <a href={`mailto:${el.value}`}>{el.value}</a>
                            </div>
                        </div>
                    )
                case "website":
                    return (
                        <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                            {el?.icon && <img alt={"contact-icon"} src={`/images/icons/website.svg`} />}
                            <div>
                                <a href={el.value.includes('http') ? el.value : `http://${el.value}`}>{el?.value}</a>
                            </div>
                        </div>
                    )
                default:
                    return (
                        <div className={`contact-card ${!el?.value && 'hide'} ${isMobile && displayMoreCards && i > 1 && 'hide'}`} key={i}>
                            {el?.icon && <img alt={"contact-icon"} src={`/images/icons/phone.svg`} />}
                            <div>
                                <a href={`tel:${el.value}`}>{el.value}</a>
                            </div>
                        </div>
                    )
            }
        }
    }

    const renderDoctorHeaderDesktop = () => {
        return (
            <div className="doctor-header-container">
                <div className="doctor-container">
                    <div className="image-container">
                        <img src={doctor.imageUrl} className="doctor-img" alt="doctor-logo" />
                        {doctor.score > 0 && <div className="rating">{Math.floor(doctor.score)}</div>}
                        <div className="rating-container">
                            <div className="upper-flex">
                                <div className="stars-wrapper">
                                    <span>{doctor.noOfReviews} recenzii</span>
                                    <div className="stars-container">
                                        {Array(5).fill(1).map((el, i) =>
                                            <img alt={"rating"} key={i} src={i >= doctor.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                        )}
                                    </div>
                                </div>
                                {doctor?.reviews?.length > 0 && <div onClick={scrollingTop} className="see-reviews">Vezi toate recenziile</div>}
                            </div>
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="flex-wrapper">
                            <div className="title-wrapper">
                                <span className="name">{doctor.name}</span>
                            </div>
                            <div className="specs-container">
                                <div className="spec-wrapper">
                                    {doctor?.degrees?.map((deg, i) => {
                                        return (
                                            <div className="round-spec" key={i}>
                                                {deg}
                                            </div>
                                        )
                                    })}
                                </div>
                                <img src="/images/arriw.svg" alt={"moving arrow"} />
                                <div className="spec-wrapper">
                                    {doctor?.specialities?.map((spec, i) => {
                                        return (
                                            <div className="round-spec" key={i}>
                                                {spec}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {doctor.competences &&
                            <div className="comp-wrapper">
                                <span>Competente</span>
                                <div className="competences-container">

                                    {doctor?.competences?.map((comp, i) => {
                                        return (
                                            <div className="round-spec" key={i}>
                                                {comp}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            }
                            <div className="contact-container">
                                {doctor.contact && flattenedResponse(doctor.contact).map((el, i) =>
                                    <React.Fragment key={i}>
                                        {handleContactType(el, i)}
                                    </React.Fragment>
                                )}
                            </div>

                        </div>
                        <div className="social-wrapper">
                            {!doctor.has_user &&
                                <div className={'revendica'}>
                                    <div className={'button'} onClick={goToRedeem} > Revendică profilul  </div>
                                </div>
                            }
                            <div className={`links-wrapper small-margin-bottom`}>
                                {doctor?.links?.map((link, i) =>
                                    <a key={i} href={link.value && link.value.includes('http') ? link.value : `http://${link.value}`} target={"_blank"} rel="noreferrer" className={`link ${!link.value && 'hide'}`}>
                                        <img alt={link.type} src={`/images/icons/${link.type}.svg`} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <a  rel="noreferrer" style={{marginRight: 0}} target="_blank" href={addsToDisplay['doctorpage_3']?.href}>
                    <img className="add" alt={"adds"}
                         style={{marginTop: '10px', height: addsToDisplay['doctorpage_3']?.size.split("x")[0]+'px', width: addsToDisplay['doctorpage_3']?.size.split("x")[1]+'px'}}
                         src={addsToDisplay['doctorpage_3']?.photo}/>
                </a>
            </div>
        )
    }

    const renderDoctorHeaderMobile=()=>{
        return (
            <div className="doctor-header-mobi">
                   <div className="header-container">
                    <div className="container">
                        <div className="image-container">
                            <img src={doctor.imgUrl} alt="doctor-pic" />
                        </div>
                        <div className="text-container">
                            <div className="title-wrapper">
                                <span className="name">{doctor.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-container">
                    <div className="stars-wrapper">
                        {doctor.score > 0 && <div className="rating">{Math.floor(doctor.score)}</div>}
                        <span>{doctor.noOfReviews} recenzii</span>
                        <div className="stars-container">
                            {Array(5).fill(1).map((el, i) =>
                                <img alt={"rating"} key={i} src={i >= doctor.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                            )}
                        </div>
                    </div>
                    {doctor?.reviews?.length > 0 &&
                        <div onClick={scrollingTop} className="view-reviews">Vezi toate recenziile</div>}
                    {doctor?.collaborator_clinics?.length > 0 &&
                                    <React.Fragment>
                                        <div className="container-title">Clinici unde ofer consultații</div>
                                        <div style={{ marginBottom: '20px' }} className="col col-clinics">
                                            {doctor?.collaborator_clinics?.length !== 0 &&
                                                doctor?.collaborator_clinics.map((clinic, i) => {
                                                    return <ClinicCard clinic={clinic} key={i} />
                                                })
                                            }
                                        </div>
                                    </React.Fragment>
                                }
                </div>
                </div>
            </div>
        )
    }


    return (
        <div className='doctor-page'>
            {
                loading
                    ? <LoadingSpinner />
                    : <React.Fragment>
                        <div className="desktop">{renderDoctorHeaderDesktop()}</div>
                        <div className="mobile">{renderDoctorHeaderMobile()}</div>

                        <div className="grid">
                            <div className="info-left-container ">
                                <div className="desktop">
                                    {doctor?.testimonials?.length > 0 &&
                                        <React.Fragment>
                                            <div className="container-title">Testimoniale</div>
                                            <Carousel onScroll={scrollingTop} content={doctor.testimonials} />
                                        </React.Fragment>
                                    }
                                </div>
                                <a  rel="noreferrer" style={{marginRight: 0}} target="_blank" href={addsToDisplay['doctorpage_1']?.href}>
                                    <img className="add" alt=""
                                         style={{maxHeight: addsToDisplay['doctorpage_1']?.size.split("x")[0]+'px', maxWidth: addsToDisplay['doctorpage_1']?.size.split("x")[1]+'px'}}
                                         src={addsToDisplay['doctorpage_1']?.photo}/>
                                </a>
                                <a  rel="noreferrer" target="_blank" href={addsToDisplay['doctorpage_2']?.href}>
                                    <img className="add" alt=""
                                         style={{ maxHeight: addsToDisplay['doctorpage_2']?.size.split("x")[0]+'px', maxWidth: addsToDisplay['doctorpage_2']?.size.split("x")[1]+'px'}}
                                         src={addsToDisplay['doctorpage_2']?.photo}/>
                                </a>
                            </div>
                            <div className="info-right-container">
                                <img alt="" className="add mobile" src="/images/ads/add2.svg" />
                                {doctor?.collaborator_clinics?.length > 0 &&
                                    <React.Fragment>
                                        <div className="container-title">Clinici unde ofer consultații</div>
                                        <div style={{ marginBottom: '20px' }} className="col col-clinics">
                                            {doctor?.collaborator_clinics?.length !== 0 &&
                                                doctor?.collaborator_clinics.map((clinic, i) => {
                                                    return <ClinicCard clinic={clinic} key={i} />
                                                })
                                            }
                                        </div>
                                    </React.Fragment>
                                }
                                {doctor?.collaborator_doctors?.length > 0 &&
                                    <React.Fragment>
                                        <div className="container-title">Medici colaboratori</div>
                                        <div style={{ marginBottom: '20px' }} className="col col-doctors">
                                            {doctor?.collaborator_doctors?.length !== 0 &&
                                                doctor?.collaborator_doctors.map((doc, i) => {
                                                    return <DoctorCard type={2} doctor={doc} key={i} />
                                                })
                                            }
                                        </div>
                                    </React.Fragment>
                                }
                                {
                                    !!doctor.about &&
                                    <React.Fragment>
                                        <div className="container-title">Despre mine</div>
                                        <div className="about-me">
                                            {doctor.about}
                                        </div>
                                    </React.Fragment>
                                }
                                <img alt="" className="add mobile" src="/images/ads/add2.svg" />
                            </div>
                        </div>
                        <div className="reviews-wrapper">
                            <div className="reviews-container " ref={targetElement}>
                                {doctor?.reviews?.length > 0 && <div className="container-title">Ce spun pacienții</div>}
                                {doctor?.reviews?.map((review, i) =>
                                    <Review key={i} review={review} />)}
                            </div>
                            {!review.isReviewSubmitted && <div className="add-review-wrapper">
                                {!isReviewFormDisplayed
                                    ?
                                    <button onClick={() => setIsReviewFormDisplayed(true)} className={`button border-button round`}>Adauga recenzie</button>
                                    :
                                    <React.Fragment>
                                        <div className="container-title">Adaugă o recenzie</div>
                                        <form onSubmit={handleAddReview} autoComplete="off" className="add-review-form">
                                            <label>Nume</label>
                                            <input className="full-width" type="text" name="name" value={review.name.value}
                                                onChange={handleChange} onBlur={isFormEmpty} />
                                            <label>Email</label>
                                            <input className="full-width" type="email" name="email" value={review.email.value}
                                                onChange={handleChange} onBlur={isFormEmpty} />
                                            <label>Recenzie</label>
                                            <textarea rows='6' maxLength={review.maxLength} className="full-width" name="comment" value={review.comment.value}
                                                onChange={handleChange} onBlur={isFormEmpty} />
                                            <div className="counter"> {review.comment.value?.length} / {review.maxLength}</div>
                                            <label>Rating</label>
                                            <div className="stars-wrapper">
                                                <div className="stars-container">
                                                    {Array(5).fill(1).map((el, i) =>
                                                        <span onClick={() => setReview({ ...review, rating: { value: i + 1 } })} key={i} >
                                                            <img alt="" src={i >= review.rating.value ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                                        </span>)}
                                                </div>
                                            </div>
                                            <div style={{margin: "auto"}}>
                                                <ReCAPTCHA
                                                    onChange={handleCaptcha}
                                                    ref={recaptchaRef}
                                                    sitekey={REACT_RECAPTCHA_KEY}
                                                />
                                            </div>

                                            <button className={`button border-button round ${!formValid ? 'disabled' : ''}`}>Adaugă o recenzie</button>
                                            {
                                                review.server.error &&
                                                <div className={'error'}>{review.server.error}</div>
                                            }
                                        </form>
                                    </React.Fragment>
                                }
                            </div>}
                        </div>
                    </React.Fragment>
            }
        </div>
    )
}
export default DoctorPage;
