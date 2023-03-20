import React, { useEffect, useState } from 'react'
import "./FilterPage.scss"
import Dropdown from '../../../components/Dropdown/Dropdown';
import ClinicFilterContainer from '../../../components/ClinicFilterContainer/ClinicFilterContainer';
import { API_MAP, getAPILink } from "../../../utils/routes";

const options = [
    { value: 'clinica', label: 'Clinica' },
    // { value: 'doctor', label: 'Doctor' },
    // { value: 'specializare', label: 'Specializare' }
];

const towns = [
    { value: 'buc', label: 'Bucuresti' },
    { value: 'cluj', label: 'Cluj' },
    { value: 'alba', label: 'Alba' }
];

const FilterPage = (props) => {
    const [selectedOption, setSelected] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        perPage: 4,
        currentPage: 1,
        maxPage: null,
    })

    const [state, setState] = useState({
        name: new URLSearchParams(window.location.search).get('searchTerm') || '',
        town: new URLSearchParams(window.location.search).get('town') || [],
        clinic_specialities: new URLSearchParams(window.location.search).get('clinicSpecialities') || [],
        unity_facilities: new URLSearchParams(window.location.search).get('unitFacilities') || [],
        unity_types: new URLSearchParams(window.location.search).get('unitTypes') || [],
    })

    const [clinics, setClinics] = useState([])

    const [town, setTown] = useState([])
    const [clinicSpecialities, setClinicSpecialities] = useState([])
    const [medicalFacilities, setMedicalFacilities] = useState([])
    const [unityTypes, setUnityTypes] = useState([])

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    }

    const handleInput = (ev) => {
        setState({ ...state, [ev.target.name]: ev.target.value })
    }

    const handleSelectFilters = (values, label) => {
        setState({ ...state, [label]: values })
    }

    const mapServerRespToFront = (listOfClinics) => {
        return listOfClinics.map((clinic) => {
            return {
                id: clinic.id,
                name: clinic.clinic_name,
                image: clinic.profile_picture,
                score: clinic?.average_rating * 2 || 0,
                noOfReviews: clinic?.review_count || 0,
                rating: clinic?.average_rating || 0,
                specialty: clinic.clinic_specialities.map((cs) => { return cs.label }).join(", "),
                type: clinic.medical_unit_types.map((mut) => { return mut.label }).join(", "),
                contact: [
                    { type: 'phoneNo', value: JSON.parse(clinic.primary_phone).value },
                    { type: "location", value: clinic.clinic_town },
                    { type: "email", value: clinic.primary_email }
                ],
                reviews: clinic.recent_reviews?.map((rev) => {
                    return {
                        name: rev.name,
                        rating: rev.rating,
                        text: rev.comment
                    }
                }) || [],
            }
        })
    }

    useEffect(() => {
        fetch(getAPILink(API_MAP.GET_CLINICS_FILTER + getQueryFromState(state)), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                setClinics(mapServerRespToFront(response.results))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [state])

    useEffect(() => {
        nextPage()
    }, [pagination])

    const nextPage = () => {
        console.log('here net page')
        fetch(getAPILink(API_MAP.GET_CLINICS_FILTER + getQueryFromState(state)), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                setClinics(mapServerRespToFront(response.results))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = () => { }

    const getQueryFromState = (state) => {
        console.log(state, "STATE")
        console.log(state.clinic_specialities.length, 'elelelel')
        let link = '?page=' + pagination.currentPage + '&page_size=' + pagination.perPage
        if (state.name) {
            link += `&name=${state.name || ''}`
        }
        if (state.town.length !== 0) {
            link += `&town=${state.town.map((t) => t.value).join("|")}`
        }

        if (typeof state.clinic_specialities == "string") {
            link += `&clinic_specialities=${state.clinic_specialities || ''}`
        } else {
            link += `&clinic_specialities=${state.clinic_specialities.map((t) => t.value).join("|")}`
        }

        if (state.clinic_specialities.length !== 0) {
            link += `&unity_facilities=${state.unity_facilities.map((t) => t.value).join("|")}`
        }
        if (state.unity_types.length !== 0) {
            link += `&unity_types=${state.unity_types.map((t) => t.value).join("|")}`
        }
        return link
    }

    useEffect(() => {
        fetch(getAPILink(API_MAP.GET_CLINICS_FILTER + getQueryFromState(state)), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                setClinics(mapServerRespToFront(response.results))
                setPagination((prev) => ({
                    ...prev,
                    maxPage: Math.ceil(response.count / 4)
                }))
            })
            .catch((err) => {
                console.log(err)
            })
        fetch(getAPILink(API_MAP.GET_CLINIC_SPECIALITIES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                console.log(mapped, 'specilaiitioti')
                setClinicSpecialities(mapped)
            })
            .catch((err) => {
                console.log(err)
            })
        fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setUnityTypes(mapped)
            })
            .catch((err) => {
                console.log(err)
            })
        fetch(getAPILink(API_MAP.GET_MEDICAL_FACILITIES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setMedicalFacilities(mapped)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
console.log(state.clinic_specialities,'SPECIALITATI')
    return (
        <div className="filter-page">
            <div className="filter-main-content">
                <div className="left-side">
                    <div className="search-container">
                        <div className="dropdown">
                            <form className="searchbar">
                                <div className="upper-container">
                                    <input onChange={handleInput} className="search" value={state.name} type="text" placeholder="Cauta" name="name" />
                                    <select name="searching" id="searching" onChange={(e) => handleChange(e.target.value)}>
                                        <option value="clinica">Clinica</option>
                                        {/*<option value="doctor">Doctor</option>*/}
                                        {/*<option value="specialitate">Specialitate</option>*/}
                                    </select>
                                </div>
                                <button className="button" onClick={handleSearch}>Cauta</button>
                            </form>
                        </div>
                    </div>
                    <Dropdown onSelect={(values) => handleSelectFilters(values, 'town')} options={towns} title={"Oras"} />
                    <Dropdown  onSelect={(values) => handleSelectFilters(values, 'clinic_specialities')} options={clinicSpecialities} title={"Specilitati Clinica"} />
                    <Dropdown onSelect={(values) => handleSelectFilters(values, 'unity_facilities')} options={medicalFacilities} title={"Facilitati Clinica"} />
                    <Dropdown onSelect={(values) => handleSelectFilters(values, 'unity_types')} options={unityTypes} title={"Tip unitate medicala"} />
                </div>
                <div className="center-side">
                    <div className="results-container">
                        {clinics.map((clinic, i) =>
                            <ClinicFilterContainer key={i} clinic={clinic} />
                        )}
                    </div>
                    {/* Pagination */}
                    <div className={'pagination'}>
                        {pagination.maxPage !== 1 &&
                            Array(pagination.maxPage).fill(1).map((e, index) => {
                                return <span key={index}
                                    onClick={() => { setPagination((prev) => ({ ...prev, currentPage: index + 1 })) }}
                                    className={pagination.currentPage === index + 1 ? 'active' : ''}>{index + 1}
                                </span>
                            })
                        }
                    </div>
                </div>
                <div className="right-side">
                    <iframe
                        title={'google maps'}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                        width="100%"
                        height="810"
                        frameBorder="0"
                        style={{ border: 0, marginTop: 15 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </div>
            </div >

        </div >
    );
}

export default FilterPage;
