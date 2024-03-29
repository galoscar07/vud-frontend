import React, {useEffect, useState} from 'react'
import "./FilterPage.scss"
import Dropdown from '../../../components/Dropdown/Dropdown';
import ClinicFilterContainer from '../../../components/ClinicFilterContainer/ClinicFilterContainer';
import {API_MAP, getAPILink, routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom"
import MapWrapper from "../../../components/Map/Map";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DoctorCard from "../../../components/DoctorCard/DoctorCard";
import {JUD_ORA} from "../../../utils/judete";

const initialPagination = {
  perPage: 4,
  currentPage: 1,
  maxPage: null,
}
const label_ads = [
  'searchpage_1', 'searchpage_2', 'searchpage_3'
]
const default_adds = {
  'searchpage_1': {
    id: 1,
    href: 'https://www.google.com',
    alt: 'add-1',
    photo: "/images/ads/add2.svg",
    size: '90x729',
  },
  'searchpage_2': {
    id: 2,
    href: 'https://www.google.com',
    alt: 'add-1',
    photo: "/images/ads/add8.svg",
    size: '250x300'
  },
  'searchpage_3': {
    id: 3,
    href: 'https://www.google.com',
    alt: 'add-1',
    photo: "/images/ads/add8.svg",
    size: '250x300',
  },
}

function getAllCities(e = null, just10 = false) {
  const citiesList = [];

  if (just10) {
    return [
      {value: "Sector 1", label: "Bucuresti S1"},
      {value: "Sector 2", label: "Bucuresti S2"},
      {value: "Sector 3", label: "Bucuresti S3"},
      {value: "Sector 4", label: "Bucuresti S4"},
      {value: "Sector 5", label: "Bucuresti S5"},
      {value: "Sector 6", label: "Bucuresti S6"},
      {value: "Bucuresti", label: "Bucuresti"},
      {value: "Cluj Napoca", label: "Cluj Napoca"},
      {value: "Iasi", label: "Iasi"},
      {value: "Timisoara", label: "Timisoara"},
      {value: "Targu Mures", label: "Targu Mures"},
    ]
  }

  for (const entry of JUD_ORA.judete) {
    const cities = entry.localitati;
    for (const city of cities) {
      citiesList.push({ value: city.nume, label: city.nume });
    }
  }
  const lowerVal = e.toLowerCase()
  return citiesList.filter(el => el.value.toLowerCase().includes(lowerVal));
}

const FilterPage = (props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Adds
  const [addsToDisplay, setAddsToDisplay] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0)
    const jsonArray = JSON.parse(localStorage.getItem('ads') || '[]');
    const filteredAds = jsonArray.filter(item => item.location.includes('searchpage'));
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
  }, [])

  // Objects from BE
  const [clinics, setClinics] = useState([])
  const [doctors, setDoctors] = useState([])
  const [state, setState] = useState({
    search_term: new URLSearchParams(window.location.search).get('search_term') || '',
    search_type: new URLSearchParams(window.location.search).get('search_type') || '',
    clinic_specialities: new URLSearchParams(window.location.search).get('clinic_specialities') || '',
    clinic_facilities: new URLSearchParams(window.location.search).get('clinic_facilities') || '',
    clinic_types: new URLSearchParams(window.location.search).get('clinic_types') || '',
    clinic_town: new URLSearchParams(window.location.search).get('clinic_town') || '',
    doctor_specialities: new URLSearchParams(window.location.search).get('doctor_specialities') || '',
    doctor_competences: new URLSearchParams(window.location.search).get('doctor_competences') || '',
    doctor_clinics: new URLSearchParams(window.location.search).get('doctor_clinics') || '',
  })
  const [pagination, setPagination] = React.useState(initialPagination)

  // Input
  const handleInput = (ev) => {
    setState({...state, [ev.target.name]: ev.target.value})
  }

  // Dropdowns values
  const [clinicSpecialities, setClinicSpecialities] = useState([])
  const [clinicFacilities, setClinicFacilities] = useState([])
  const [clinicTypes, setClinicTypes] = useState([])
  const [clinicTowns, setClinicTowns] = useState(getAllCities('', true))
  const [doctorSpecialities, setDoctorSpecialities] = useState([])
  const [doctorCompetences, setDoctorCompetences] = useState([])
  const [doctorClinics, setDoctorClinics] = useState([])
  useEffect(() => {
    fetch(getAPILink(API_MAP.GET_CLINIC_SPECIALITIES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.label}
        })
        setClinicSpecialities(mapped)
        if (state.clinic_specialities) {
          const ids = state.clinic_specialities.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('clinicSpecialities', ad)
        }
      })
      .catch((err) => {
      })
    fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.label}
        })
        setClinicTypes(mapped)
        if (state.clinic_types) {
          const ids = state.clinic_types.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('clinicTypes', ad)
        }
      })
      .catch((err) => {
      })
    fetch(getAPILink(API_MAP.GET_MEDICAL_FACILITIES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.label}
        })
        setClinicFacilities(mapped)
        if (state.clinic_facilities) {
          const ids = state.clinic_facilities.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('clinicFacilities', ad)
        }
      })
      .catch((err) => {
      })
    fetch(getAPILink(API_MAP.GET_SPECIALITIES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.label}
        })
        setDoctorSpecialities(mapped)
        if (state.doctor_specialities) {
          const ids = state.doctor_specialities.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('doctorSpecialities', ad)
        }
      })
      .catch((err) => {
      })
    fetch(getAPILink(API_MAP.GET_COMPETENCES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.label}
        })
        setDoctorCompetences(mapped)
        if (state.doctor_competences) {
          const ids = state.doctor_competences.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('doctorCompetences', ad)
        }
      })
      .catch((err) => {
      })
    fetch(getAPILink(API_MAP.GET_CLINICS_NAMES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {
          return {value: el.id, label: el.clinic_name}
        })
        setDoctorClinics(mapped)
        if (state.doctor_clinics) {
          const ids = state.doctor_clinics.split('|')
          const ad = ids.map((el) => {
            const filtered = mapped.filter((f) => f.value.toString() === el)
            return filtered[0] || null
          })
          handleChangeDropdowns('doctorClinics', ad)
        }
      })
      .catch((err) => {
      })
  }, [])

  // Dropdowns on change
  const [selectedValuesDropdown, setSelectedValuesDropdown] = useState({
    clinicSpecialities: [],
    clinicFacilities: [],
    clinicTypes: [],
    clinicTown: [],
    doctorSpecialities: [],
    doctorCompetences: [],
    doctorClinics: [],
  })
  const handleChangeDropdowns = (label, value) => {
    setSelectedValuesDropdown({...selectedValuesDropdown, [label]: value})
  }

  // Map Server responses to FE
  const mapServerRespToFront = (listOfClinics) => {
    return listOfClinics.map((clinic) => {
      return {
        id: clinic.id,
        name: clinic.clinic_name,
        image: clinic.profile_picture,
        score: clinic?.average_rating * 2 || 0,
        noOfReviews: clinic?.review_count || 0,
        rating: clinic?.average_rating || 0,
        address: `Str. ${clinic?.clinic_street} ${clinic?.clinic_number ? 'nr.' + clinic?.clinic_number : ''}${clinic.clinic_town !== null ? ', ' + clinic.clinic_town : ''}`,
        description: clinic?.description,
        specialty: clinic.clinic_specialities.map((cs) => {
          return cs.label
        }).join(", "),
        type: clinic.medical_unit_types.map((mut) => {
          return mut.label
        }).join(", "),
        contact: [
          {type: 'phoneNo', value: JSON.parse(clinic.primary_phone || "{}")?.value},
          {
            type: "location",
            value: `${clinic?.clinic_street} ${clinic?.clinic_number ? clinic?.clinic_number : ''}${clinic.clinic_town !== null ? ', ' + clinic.clinic_town : ''}`,
          },
          {type: "email", value: clinic.primary_email}
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
  const mapServerRespToFrontDoctor = (listOfDoctors) => {return listOfDoctors}

  // Calls
  const getClinics = (link) => {
    fetch(getAPILink(API_MAP.GET_CLINICS_FILTER + link), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.detail === 'Invalid page.') {
          setClinics([])
          setPagination(initialPagination)
          setLoading(false)
          return
        }
        setClinics(mapServerRespToFront(response.results))
        setPagination((prev) => ({
          ...prev,
          maxPage: Math.ceil(response.count / 4)
        }))
        setLoading(false)
      })
      .catch((err) => {
        setClinics([])
        setPagination(initialPagination)
      })
  }
  const getDoctors = (link) => {
    fetch(getAPILink(API_MAP.GET_DOCTOR_FILTERED + link), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.detail === 'Invalid page.') {
          setDoctors([])
          setPagination(initialPagination)
          setLoading(false)
          return
        }
        setDoctors(mapServerRespToFrontDoctor(response.results))
        setPagination((prev) => ({
          ...prev,
          maxPage: Math.ceil(response.count / 4)
        }))
        setLoading(false)
      })
      .catch((err) => { })
  }

  const getData = () => {
    let link = '?page=' + pagination.currentPage + '&page_size=' + pagination.perPage
    if (state.search_type === 'clinic') {
      link += `&name=${state.search_term}`
      link += `&town=${selectedValuesDropdown.clinicTown.map(el => {return el.value}).join("|") || ''}`
      link += `&clinic_specialities=${selectedValuesDropdown.clinicSpecialities.map((el) => {return el.value}).join("|") || ''}`
      link += `&unit_facilities=${selectedValuesDropdown.clinicFacilities.map((el) => {return el.value}).join("|") || ''}`
      link += `&unity_types=${selectedValuesDropdown.clinicTypes.map((el) => {return el.value}).join("|") || ''}`
      getClinics(link)
    }
    else if (state.search_type === 'doctor') {
      link += `&name=${state.search_term}`
      link += `&doctor_specialities=${selectedValuesDropdown.doctorSpecialities.map((el) => {return el.value}).join("|") || ''}`
      link += `&doctor_competences=${selectedValuesDropdown.doctorCompetences.map((el) => {return el.value}).join("|") || ''}`
      link += `&doctor_clinics=${selectedValuesDropdown.doctorClinics.map((el) => {return el.value}).join("|") || ''}`
      getDoctors(link)
    }
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    let query = '?'
    query += 'search_term=' + state.search_term + '&'
    query += 'search_type=' + state.search_type + '&'
    query += 'clinic_specialities=' + selectedValuesDropdown.clinicSpecialities.map(el => {return el.value}).join("|") + '&'
    query += 'clinic_facilities=' + selectedValuesDropdown.clinicFacilities.map(el => {return el.value}).join("|")  + '&'
    query += 'clinic_types=' + selectedValuesDropdown.clinicTypes.map(el => {return el.value}).join("|")  + '&'
    query += 'clinic_town=' + selectedValuesDropdown.clinicTown.map(el => {return el.value}).join("|")  + '&'
    query += 'doctor_specialities=' + selectedValuesDropdown.doctorSpecialities.map(el => {return el.value}).join("|")  + '&'
    query += 'doctor_competences=' + selectedValuesDropdown.doctorCompetences.map(el => {return el.value}).join("|")  + '&'
    query += 'doctor_clinics=' + selectedValuesDropdown.doctorClinics.map(el => {return el.value}).join("|")
    navigate(routes.FILTER_PAGE + query)
    getData()
  }

  useEffect(() => {
    handleSubmit()
  }, [state])

  useEffect(() => {
    handleSubmit()
  }, [])


  const renderClinic = () => {
    if (clinics.length === 0) {
      return <p>Ne pare rau, dar nu am gasit rezultate pentru cautarea curenta.</p>
    } else {
      return <React.Fragment>
        <div className="results-container">
          {clinics.map((clinic, i) =>
            <React.Fragment>
              <ClinicFilterContainer key={i} clinic={clinic}/>
              {i === 1 &&
                <div>
                  <a target="_blank" href={addsToDisplay['searchpage_1']?.href}>
                    <img className="add"
                         src={addsToDisplay['searchpage_1']?.photo}
                           style={{height: addsToDisplay['searchpage_1']?.size.split("x")[0]+'px', width: addsToDisplay['searchpage_1']?.size.split("x")[1]+'px'}
                    }/>
                  </a>
                </div>
              }
            </React.Fragment>
          )}
        </div>
        <div className={'pagination'}>
          {pagination.maxPage !== 1 && (pagination.currentPage !== 1 || clinics.length === 4) &&
              getArrayPageNumbers()
          }
        </div>
      </React.Fragment>
    }
  }

  function getArrayPageNumbers() {

    let currentPage = pagination.currentPage
    let visiblePageCount = 8
    let maxPage = pagination.maxPage

    const halfVisibleCount = Math.floor(visiblePageCount / 2);
    let startPage = Math.max(currentPage - halfVisibleCount, 1);
    let endPage = Math.min(startPage + visiblePageCount - 1, maxPage);

    if (endPage - startPage + 1 < visiblePageCount) {
      startPage = Math.max(endPage - visiblePageCount + 1, 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <React.Fragment>
          <span onClick={() => {
            setPagination((prev) => ({...prev, currentPage: pagination.currentPage - 1}))
            getData()
          }}>Prev</span>
          {pageNumbers.map((page) => {
            return <span key={page}
                  onClick={() => {
                    window.scrollTo(0,0)
                    setPagination((prev) => ({...prev, currentPage: page}))
                    getData()
                  }}
                  className={pagination.currentPage === page? 'active' : ''}>
              {page}
            </span>
          })}
          <span onClick={() => {
            setPagination((prev) => ({...prev, currentPage: pagination.currentPage + 1}))
            getData()
          }}>Next</span>
      </React.Fragment>
    );
  }

  const changeDropdownValue = (e) => {
    if (e.length >= 2) {
      setClinicTowns(getAllCities(e));
    } else {
      setClinicTowns(getAllCities(e, true))
    }
  }


  const renderDoctor = () => {
    if (doctors.length === 0) {
      return <p>Ne pare rau, dar nu am gasit rezultate pentru cautarea curenta.</p>
    } else {
      return <React.Fragment>
        <div className="results-container">
          {doctors.map((doc, i) =>
            <React.Fragment>
              <DoctorCard key={i} type={3} doctor={doc}/>
              {i === 1 &&
                <div>
                  <img className="add" src={addsToDisplay['searchpage_1']?.photo}/>
                </div>
              }
            </React.Fragment>
          )}
        </div>
        <div className={'pagination'}>
          {pagination.maxPage !== 1 && (pagination.currentPage !== 1 || doctors.length === 4) &&
              getArrayPageNumbers()
          }
        </div>
      </React.Fragment>
    }
  }

  return (
    <div className="filter-page">
      <div className="filter-main-content">
        <div className="left-side">
          <div className="search-container">
            <div className="dropdown">
              <form className="searchbar">
                <div className="upper-container">
                  <input onChange={handleInput} className="search" value={state.search_term} type="text" placeholder="Caută"
                         name="search_term"/>
                  <select value={state.search_type} name="search_type" id="searching" onChange={handleInput}>
                    <option value="clinic">Clinică</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          {
            state.search_type === 'clinic' &&
            <React.Fragment>
              <Dropdown title={"Oraș"} selected={selectedValuesDropdown.clinicTown} placeholder={"Selectează oraș"}
                        onSelect={(values) => handleChangeDropdowns('clinicTown', values)}
                        options={clinicTowns} isLess3Condition isMulti callbackLess3Condition={changeDropdownValue}/>
              <Dropdown title={"Specilități Clinică"} selected={selectedValuesDropdown.clinicSpecialities}
                        onSelect={(values) => handleChangeDropdowns('clinicSpecialities', values)}
                        options={clinicSpecialities} isMulti placeholder={"Selectează specilităte"} />
              <Dropdown title={"Facilitați Clinică"} selected={selectedValuesDropdown.clinicFacilities}
                        onSelect={(values) => handleChangeDropdowns('clinicFacilities', values)}
                        options={clinicFacilities} isMulti placeholder={"Selectează facilitați"} />
              <Dropdown title={"Tip unitate medicală"} selected={selectedValuesDropdown.clinicTypes}
                        onSelect={(values) => handleChangeDropdowns('clinicTypes', values)} isMulti
                        options={clinicTypes} placeholder={"Selectează tip unitate "} />
            </React.Fragment>
          }
          {
            state.search_type === 'doctor' &&
            <React.Fragment>
              <Dropdown title={"Specialitate"} selected={selectedValuesDropdown.doctorSpecialities}
                        onSelect={(values) => handleChangeDropdowns('doctorSpecialities', values)}
                        options={doctorSpecialities} isMulti placeholder={"Selectează specialitate"}/>
              <Dropdown title={"Competențe"} selected={selectedValuesDropdown.doctorCompetences}
                        onSelect={(values) => handleChangeDropdowns('doctorCompetences', values)}
                        options={doctorCompetences} isMulti placeholder={"Selectează competențe"}/>
              <Dropdown title={"Unitate Medicală"} selected={selectedValuesDropdown.doctorClinics}
                        onSelect={(values) => handleChangeDropdowns('doctorClinics', values)}
                        options={doctorClinics} isMulti placeholder={"Selectează unitate"}/>
            </React.Fragment>
          }
          <button onClick={handleSubmit} className="button search">Cauta</button>
          <div style={{marginTop: '10px'}}>
            <a target="_blank" href={addsToDisplay['searchpage_3']?.href}>
              <img className="add"
                   src={addsToDisplay['searchpage_3']?.photo}
                   style={{height: addsToDisplay['searchpage_3']?.size.split("x")[0]+'px', width: addsToDisplay['searchpage_3']?.size.split("x")[1]+'px'}
                   }/>
            </a>
          </div>

        </div>
        <div className="center-side">
          {
            loading
              ? <LoadingSpinner></LoadingSpinner>
              : state.search_type === 'clinic'
                ? renderClinic()
                : renderDoctor()
          }
        </div>
        {
            state.search_type === 'clinic' && (
                <div className="right-side">
                  <MapWrapper
                      classes={'map-filter-page'}
                      locations={clinics.map((cli) => {
                        return {address: cli.address, name: cli.name, description: cli.description}
                      })}
                  ></MapWrapper>
                  <a target="_blank" href={addsToDisplay['searchpage_2']?.href}>
                    <img className="add"
                         src={addsToDisplay['searchpage_2']?.photo}
                         style={{marginTop: '10px', height: addsToDisplay['searchpage_2']?.size.split("x")[0]+'px', width: addsToDisplay['searchpage_2']?.size.split("x")[1]+'px'}
                         }/>
                  </a>
                </div>
            )
        }
      </div>
    </div>
  );
}

export default FilterPage;
