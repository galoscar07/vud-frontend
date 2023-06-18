import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Dropdown from '../../components/Dropdown/Dropdown';
import Review from '../../components/Review/Review';
import "./ClinicPage.scss";
import { routes } from "../../utils/routes";
import { API_MAP, getAPILink } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MapWrapper from "../../components/Map/Map";
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import _ from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import { MapTouchEvent } from 'mapbox-gl';
import ClinicCard from '../../components/ClinicCard/ClinicCard';

const dayMapping = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5
}

const label_ads = [
    'clinicpage_1'
]

const default_adds = {
    'clinicpage_1': {
        id: 1,
        href: 'www.google.com',
        alt: 'add-1',
        photo: "/images/ads/ad1.svg",
        size: '437x437',
    }
}

function ClinicPage({ props }) {
    const [clinic, setClinic] = React.useState({});
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
        maxLength: 500,
        server: {
            error: null
        }
    })
    const day = dayMapping[new Date().getDay()]

    // Doctors filter & pagination
    const [doctorState, setDoctorState] = useState({
        doctors: [],
        perPage: 3,
        currentPage: 1,
        maxPage: null,
        filter: {
            specialities: [],
            academicDegrees: [],
            medicalCompetences: []
        }
    })
    const reorganiseDoctors = () => {
        let doctors = clinic.doctors;
        if (doctorState.filter.specialities.length > 0 || doctorState.filter.academicDegrees.length || doctorState.filter.medicalCompetences.length) {
            if (doctorState.filter.specialities.length > 0)
                doctors = doctors.filter((doc) => {
                    let ok = true
                    doctorState.filter.specialities.forEach((el) => {
                        const found = doc.speciality.findIndex((e) => e.id === el.value)
                        if (found === -1) ok = false
                    })
                    return ok
                })
            if (doctorState.filter.academicDegrees.length > 0)
                doctors = doctors.filter((doc) => {
                    let ok = true
                    doctorState.filter.academicDegrees.forEach((el) => {
                        const found = doc.academic_degree.findIndex((e) => e.id === el.value)
                        if (found === -1) ok = false
                    })
                    return ok
                })
            if (doctorState.filter.medicalCompetences.length > 0)
                doctors = doctors.filter((doc) => {
                    let ok = true
                    doctorState.filter.medicalCompetences.forEach((el) => {
                        const found = doc.medical_skill.findIndex((e) => e.id === el.value)
                        if (found === -1) ok = false
                    })
                    return ok
                })
        }

        doctors = _.chunk(doctors, doctorState.perPage);

        setDoctorState({
            ...doctorState,
            doctors,
            currentPage: 1,
            maxPage: doctors.length === 0 ? 1 : doctors.length
        });
    };
    const previousPage = () =>
        setDoctorState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage - 1
        }))

    // Next Page
    const nextPage = () =>
        setDoctorState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage + 1
        }))

    useEffect(() => {
        window.scrollTo(0, 0)
        reorganiseDoctors()
    }, [clinic.doctors])



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

    const targetElement = useRef();
    const scrollingTop = (event) => {
        targetElement.current.scrollIntoView({
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
            address: `${serverClinic?.clinic_street} ${serverClinic?.clinic_number ? serverClinic?.clinic_number : ''}${serverClinic.clinic_town !== null ? ', ' + serverClinic.clinic_town : ''}`,
            typeOfClinic: serverClinic?.medical_unit_types?.map((mut) => { return mut.label }).join(", "),
            facilities: serverClinic?.unity_facilities,
            links: [
                { type: "Facebook", value: serverClinic.website_facebook || null },
                { type: "Linkedin", value: serverClinic.website_linkedin || null },
                { type: "Youtube", value: serverClinic.website_youtube || null },
                { type: "Google", value: serverClinic.website_google || null },
                { type: "Whatsapp", value: serverClinic.whatsapp || null },
            ],
            contact: [
                { type: JSON.parse(serverClinic.primary_phone).label || 'Telefon', value: JSON.parse(serverClinic.primary_phone).value, icon: "phone" },
                serverClinic.secondary_phone && JSON.parse(serverClinic.secondary_phone).map((el) => { return { type: el[0], value: el[1], icon: "phone" } }),
                serverClinic.secondary_email && { ...serverClinic?.secondary_email?.split('|').map((sc) => { return { type: "email", value: sc, icon: "email" } }) },
                { type: "email", value: serverClinic?.primary_email, icon: "email" },
                { type: "website", value: serverClinic?.website, icon: "website" },
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
                    photo: doc.profile_picture || '/images/user.svg',
                    name: doc.doctor_name,
                    academic_degree: doc.academic_degree,
                    speciality: doc.speciality,
                    medical_skill: doc.medical_skill,
                    link: doc.link,
                }
            }),
            collab_clinics: serverClinic?.collaborator_clinic?.map((clinic) => {
                return {
                    photo: '/images/user.svg',
                    name: clinic.clinic_name,
                    medical_unit_type: clinic.medical_unit_types.label,
                    address: `${clinic?.clinic_street} ${clinic?.clinic_number ? clinic?.clinic_number : ''}${clinic.clinic_town !== null ? ', ' + clinic.clinic_town : ''}`,
                    phone: clinic.primary_phone
                }
            }),
            schedule: JSON.parse(serverClinic.clinic_schedule || "{}"),
            has_user: !!serverClinic.user,
        }
        
    }

    const [academicDegreesDropDown, setAcademicDegreesDropDown] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [competences, setCompetences] = useState([])

    useEffect(() => {
        const jsonArray = JSON.parse(localStorage.getItem('ads') || '[]');
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
            .catch((err) => { })
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
            .catch((err) => { })
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
            .catch((err) => { })
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

    const handleSubmitCompetences = (selected) => {
        setSelectedCompetences(selected)
        setDoctorState((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                medicalCompetences: selected
            }
        }))
    }
    const handleSubmitDegrees = (selected) => {
        setSelectedDegrees(selected)
        setDoctorState((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                academicDegrees: selected
            }
        }))
    }
    const handleSubmitSpecialties = (selected) => {
        setSelectedSpecialties(selected)
        setDoctorState((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                specialities: selected
            }
        }))
    }
    const handleContactType = (el, i, isMobile) => {
        if (el && el.value && el.type) {
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
    }

    useEffect(() => {
        reorganiseDoctors()
    }, [selectedCompetences, selectedDegrees, selectedSpecialties])
    const navigate = useNavigate();
    const goToRedeem = () =>
        navigate({
            pathname: routes.HOW_TO_REDEEM_CLINIC,
            search: `?id=${id}`,
        });

    const renderClinicHeaderDesktop = () => {
        return (
            <div className="clinic-header-container">
                <div className="clinic-container">
                    <div className="image-container">
                        <img src={clinic.imgUrl} alt="clinic-logo" />
                        {clinic.score > 0 && <div className="rating">{Math.floor(clinic.score)}</div>}
                    </div>
                    <div className="info-container">
                        <div className="flex-wrapper">
                            <div className="title-wrapper">
                                <span className="type">{clinic.typeOfClinic}</span>
                                <span className="name">{clinic.name}</span>
                                <span className="address">{clinic.address}</span>
                            </div>
                            <div>

                                <div className={`links-wrapper ${!clinic.has_user && 'small-margin-bottom'}`}>
                                    {clinic?.links?.map((link, i) =>
                                        <a key={i} href={link.value && link.value.includes('http') ? link.value : `http://${link.value}`} target={"_blank"} rel="noreferrer" className={`link ${!link.value && 'hide'}`}>
                                            <img alt={link.type} src={`/images/icons/${link.type}.svg`} />
                                        </a>
                                    )}
                                </div>
                                {!clinic.has_user &&
                                    <div className={'revendica'}>
                                        <div>Reprezinti {clinic.name}?</div>
                                        <div className={'button'} onClick={goToRedeem} > Revendică profilul  </div>
                                    </div>
                                }

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
                                        <img key={i} title={facility.label} src={facility.icon} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-container">
                    {clinic.contact && flattenedResponse(clinic.contact).map((el, i) =>
                        <React.Fragment key={i}>
                            {handleContactType(el, i)}
                        </React.Fragment>
                    )}
                </div>
                {clinic.schedule &&
                    <div className="schedule-container">
                        <div className="weekdays-container">
                            {Object.entries(clinic.schedule).map(([weekday, inter], i) => {
                                return (
                                    <div className={`day ${day === i ? 'active' : ''}`} key={i}>
                                        <span>{weekday}</span>
                                        {
                                            inter.length > 0
                                                ? inter.map((interval, index) => {
                                                    return <span key={index} className={'interval'}>{interval.startTime} - {interval.endTime}</span>
                                                })
                                                : <span className={'interval'}>Inchis</span>

                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
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
                    {!displayMoreCards && <div className='additional mobile'>
                        <MapWrapper
                            classes={'map-clinic-page'}
                            location={[{ address: clinic.address, name: clinic.name, description: clinic.description }]}
                        ></MapWrapper>
                        {clinic.schedule &&
                            <React.Fragment>
                                <span className='mobile program'>Program</span>
                                <div className="schedule-container additional mobile">
                                    <div className="fields-wrapper">
                                        <div className="weekdays-container ">
                                            {Object.entries(clinic.schedule).map(([weekday, inter], i) => {
                                                return (
                                                    <div className={`day ${day === i ? 'active' : ''}`} key={i}>
                                                        <span className="weekday">{weekday}</span>
                                                        {
                                                            inter.length > 0
                                                                ? inter.map((interval, index) => {
                                                                    return <span key={index} className={'interval'}>{interval.startTime} - {interval.endTime}</span>
                                                                })
                                                                : <span className={'interval'}>Inchis</span>

                                                        }
                                                        { }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        <div className="facilities additional mobile">
                            <div>
                                {clinic?.facilities?.map((facility, i) =>
                                    <div className="facilities-wrapper">
                                        <img key={i} title={facility.label} src={facility.icon} />
                                        <span>{facility.label}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`additional mobile links-wrapper ${!clinic.has_user && 'small-margin-bottom'}`}>
                            {clinic?.links?.map((link, i) =>
                                <a key={i} href={link.value && link.value.includes('http') ? link.value : `http://${link.value}`} target={"_blank"} rel="noreferrer" className={`link ${!link.value && 'hide'}`}>
                                    <img key={i} alt={link.type} src={`/images/icons/${link.type}.svg`} />
                                </a>
                            )}
                        </div>
                    </div>}
                </div>
                <div className="view-more-btn" onClick={() => setDisplayMoreCards(!displayMoreCards)}>
                    {displayMoreCards ? 'Vezi toate datele de contact' : 'Inchide datele de contact'}
                </div>
                <div className="reviews-container">
                    <div className="stars-wrapper">
                        {clinic.score > 0 && <div className="rating">{Math.floor(clinic.score)}</div>}
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
                        <div className="mobile">{renderClinicHeaderMobile()}</div>
                        <div className="grid">
                            <div className="info-left-container ">
                                <div className="desktop">
                                    {clinic?.testimonials?.length > 0 && <React.Fragment>
                                        <div className="container-title">Testimoniale</div>
                                        <Carousel onScroll={scrollingTop} content={clinic.testimonials} /></React.Fragment>}
                                </div>
                                <div className='desktop'>
                                    <MapWrapper
                                        classes={'map-clinic-page'}
                                        location={[{ address: clinic.address, name: clinic.name, description: clinic.description }]}
                                    ></MapWrapper>
                                </div>
                                <img className="add" src={addsToDisplay['clinicpage_1']?.photo} />
                            </div>

                            <div className="info-right-container">
                                <img className="add mobile" src="/images/ads/add2.svg" />
                                <div className="container-title">Cautare</div>
                                <div className="col">
                                    <Dropdown selected={selectedSpecialties} options={specialities} title={"Specialitati"} onSelect={handleSubmitSpecialties} />
                                </div>
                                <div className="col-2">
                                    <Dropdown selected={selectedDegrees} options={academicDegreesDropDown} title={"Grade medicale"} onSelect={handleSubmitDegrees} />
                                    <Dropdown selected={selectedCompetences} options={competences} title={"Competente medicale"} onSelect={handleSubmitCompetences} />
                                </div>
                                {clinic.collab_clinics.length > 0 &&
                                    <React.Fragment>
                                        <div className="result-title">Clinici colaboratoare:</div>
                                        <div style={{ marginBottom: '20px' }} className="col">
                                            {clinic.collab_clinics.map((clinic)=>{
                                                    return <ClinicCard clinic={clinic} />
                                                }
                                            )}
                                        </div>
                                    </React.Fragment>
                                }

                                {doctorState.doctors.length > 0 &&
                                    <React.Fragment>
                                        <div className="result-title">Rezultate filtrare:</div>
                                        <div style={{ marginBottom: '20px' }} className="col">
                                            {doctorState.doctors.length && doctorState.doctors[doctorState.currentPage - 1]
                                                .map((doc, i) => {
                                                    return <DoctorCard type={1} doctor={doc} key={i} />
                                                })
                                            }
                                            <div className="page-btn">
                                                {
                                                    doctorState.currentPage !== 1 &&
                                                    <div onClick={previousPage} className={'button prev'}>Anterior</div>
                                                }
                                                {
                                                    doctorState.currentPage < doctorState.maxPage &&
                                                    <div onClick={nextPage} className={'button next'}>Urmator</div>
                                                }
                                            </div>
                                            <div style={{ marginTop: '10px' }}>
                                                Pagina {doctorState.currentPage} din {doctorState.maxPage}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                                {clinic.description && <div className="description-container">
                                    <p>
                                        {clinic.description}
                                    </p>

                                </div>}
                                <img className="add mobile" src="/images/ads/add2.svg" />
                            </div>

                        </div>

                        <div className="reviews-container " ref={targetElement}>
                            {clinic?.reviews?.length > 0 && <div className="container-title">Ce spun pacientii</div>}
                            {clinic?.reviews?.map((review, i) =>
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
                                        <textarea maxLength={review.maxLength} rows="6" className="full-width" type="comment" name="comment" value={review.comment.value}
                                            onChange={handleChange} onBlur={isFormEmpty} />
                                        <div className="counter"> {review.comment.value.length} / {review.maxLength}</div>
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
                    </React.Fragment>
            }
        </div>
    );
}

export default ClinicPage;
