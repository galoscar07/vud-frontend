import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Review from '../../components/Review/Review';
import { routes } from "../../utils/routes";
import { API_MAP, getAPILink } from "../../utils/routes";
import _ from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./DoctorPage.scss";
import DoctorCard from '../../components/DoctorCard/DoctorCard';

const label_ads = [
    'doctorpage_1', 'doctorpage_2'
]

const default_adds = {
    'doctorpage_1': {
        id: 1,
        href: 'www.google.com',
        alt: 'add-1',
        photo: "/images/ads/ad1.svg",
        size: '437x437',
    },
    'doctorpage_2': {
        id: 1,
        href: 'www.google.com',
        alt: 'add-1',
        photo: "/images/ads/add5.svg",
        size: '437x437',
    },
}
const doctorr = {
    id: 1,
    name: 'Tudor Andrei',
    imageUrl: "/images/user.svg",
    score: 4,
    noOfReviews: 2,
    rating: 3,
    links: [
        { type: "Facebook", value: "www.facebook.com" },
        { type: "Linkedin", value: "www.linkedin.com" },
        { type: "Youtube", value: "www.youtube.com" },
        { type: "Google", value: "www.google.com" },
        { type: "Whatsapp", value: "www.whatsapp.com" },
    ],
    contact: [
        { type: 'Telefon', value: "0747771947", icon: "phone" },
        { type: "email", value: "test@test.com", icon: "email" },
        { type: "website", value: "www.test.com", icon: "website" },
    ],
    testimonials: [{ text: "Personal foarte calduros, pregatit si foarte orientat catre pacient. Sa nu mai vorbim de dotari, capitol la care stau foaarte bine! Recomand spitalul oricui si pt. serviciile din policlinica si pt. cele din spital." },
    { text: "Am fost pacientul doamnei doctor Simona Filip si as recomanda oricand acest medic si acest spital oricui are nevoie. Nu doar doamna doctor (un om foarte cald, un profesionist desavarsit), dar si ceilalti medici (eu, ca pacient cu gastric sleeve am dezvoltat o relatie foarte apreciata si cu medicul nutritionist, de exemplu) si tot personalul clinicii face totul ca tu, ca pacient, sa ai o experienta cat mai usoara (ca placuta nu pot sa spun, daca ai ajuns si mai putin traumatizanta.Am fost anul asta la control, de cand s-au mutat in sediul nou din Aviatiei si pot sa va spun ca mai mult ca oricand m-am simtit ca intr-un spital occidental." }],
    reviews: [
        {
            name: "Onuta",
            rating: 4,
            text: "Lorem ipsum"
        },
        {
            name: "Oscar",
            rating: 3,
            text: "Lorem ipsum"
        }
    ],
    about: "Lorem ipsum",
    competences: ['Alergologie', 'Dializa cronica'],
    specialities: ['Ortopedie', 'Traumatologie'],
    degrees: ['Medic Primar'],

}
function DoctorPage({ props }) {
    const [doctor, setDoctor] = React.useState({});
    const [loading, setLoading] = React.useState(true)
    const [isReviewFormDisplayed, setIsReviewFormDisplayed] = React.useState(false)
    const [id, setId] = React.useState(null)
    const [error, setError] = React.useState('');
    const [displayMoreCards, setDisplayMoreCards] = React.useState(true);
    const [formValid, setFormValid] = React.useState(false)
    const [addsToDisplay, setAddsToDisplay] = useState({})
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
        server: {
            error: null
        }
    })
    const targetElement = useRef();
    const scrollingTop = (event) => {
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
        fetch(
            //TODO add link
            getAPILink(API_MAP.ADD_REVIEW + id), {
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
            .then((data) => {
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError("Ceva nu a funcționat. Vă rugăm să încercați în câteva minute")
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

    const collab = [{
        academic_degree: [{ id: 4, label: "Medic Primar" }],
        link: "/",
        name: "Anamaria Dinca",
        photo: "https://vud-2023.s3.amazonaws.com/media/images/collaborator_doctor/None/COPAESCU%20Catalin%20Andu/3022.jpeg",
        medical_skill: [{
            id: 352, label: "Chirurgie Generala"
        }],
        speciality: [{
            id: 9, label: "Chirurgie Laparoscopica"
        }]
    }]

    const [doctorState, setDoctorState] = useState({
        doctors: collab,
        perPage: 3,
        currentPage: 1,
        maxPage: collab.length === 0 ? 1 : collab.length
    })


    const previousPage = () =>
        setDoctorState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage - 1
        }))

    const nextPage = () =>
        setDoctorState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage + 1
        }))

    useEffect(() => {
        setDoctor(doctorr);
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

        setLoading(false)

    }, [])

    const navigate = useNavigate();
    const goToRedeem = () =>
        navigate({
            pathname: routes.HOW_TO_REDEEM,
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
                                            <img key={i} src={i >= doctor.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
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
                                <img src="/images/arriw.svg" />
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
                        <div className="grid">
                            <div className="info-left-container ">
                                <div className="desktop">
                                    {doctor?.testimonials?.length > 0 && <React.Fragment>
                                        <div className="container-title">Testimoniale</div>
                                        <Carousel onScroll={scrollingTop} content={doctor.testimonials} /></React.Fragment>}
                                </div>
                                <img className="add" src={addsToDisplay['doctorpage_1']?.photo} />
                                <img className="add" src={addsToDisplay['doctorpage_2']?.photo} />

                            </div>
                            <div className="info-right-container">
                                <img className="add mobile" src="/images/ads/add2.svg" />
                                <div className="container-title">Clinici unde ofer consultații</div>
                                <div className="container-title">Medici colaboratori</div>
                                {doctorState?.doctors?.length > 0 &&
                                    <React.Fragment>
                                        <div style={{ marginBottom: '20px' }} className="col">
                                            {doctorState?.doctors?.length && doctorState?.doctors
                                                .map((doc, i) => {
                                                    return <DoctorCard doctor={doc} key={i} />
                                                })
                                            }
                                            <div className="page-btn">
                                                {
                                                    doctorState?.currentPage !== 1 &&
                                                    <div onClick={previousPage} className={'button prev'}>Anterior</div>
                                                }
                                                {
                                                    doctorState?.currentPage < doctorState?.maxPage &&
                                                    <div onClick={nextPage} className={'button next'}>Urmator</div>
                                                }
                                            </div>
                                            <div style={{ marginTop: '10px' }}>
                                                Pagina {doctorState?.currentPage} din {doctorState?.maxPage}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                                <div className="container-title">Despre mine</div>
                                <div className="about-me">
                                    {doctor.about}
                                </div>
                                <img className="add mobile" src="/images/ads/add2.svg" />
                            </div>
                        </div>
                        <div className="reviews-wrapper">
                            <div className="reviews-container " ref={targetElement}>
                                {doctor?.reviews?.length > 0 && <div className="container-title">Ce spun pacientii</div>}
                                {doctor?.reviews?.map((review, i) =>
                                    <Review key={i} review={review} />)}
                            </div>
                            {!review.isReviewSubmitted && <div className="add-review-wrapper">
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
                            </div>}
                        </div>
                    </React.Fragment>
            }
        </div>
    )
}
export default DoctorPage;