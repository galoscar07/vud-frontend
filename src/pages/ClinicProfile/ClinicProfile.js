import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicProfile.scss";
import _ from 'lodash';
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import MapWrapper from "../../components/Map/Map";
import InviteCard from "../DoctorData/InviteCard/InviteCard";
import { JUD_ORA } from "../../utils/judete";

const days = {
  'Luni': [],
  'Marti': [],
  'Miercuri': [],
  'Joi': [],
  'Vineri': [],
  'Sambata': [],
  'Duminica': []
}

const initialPaginated = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

const ClinicProfile = (props) => {
  // Loading var
  const [loading, setLoading] = useState(true)

  // Navigate
  const navigate = useNavigate();

  // Inputs state
  const [state, setState] = useState({
    clinic_name: props?.selected?.clinic_name || '',
    clinic_street: props?.selected?.clinic_street || '',
    clinic_number: props?.selected?.clinic_number || '',
    clinic_town: props?.selected?.clinic_town || '',
    clinic_county: props?.selected?.clinic_county || '',
    clinic_other_details: props?.selected?.clinic_other_details || '',
    primary_phone: props?.selected?.primary_phone || '',
    primary_phone_label: props.selected?.primary_phone_label || 'phone',
    primary_email: props?.selected?.primary_email || '',
    website: props?.selected?.website || '',
    website_facebook: props?.selected?.website_facebook || '',
    website_google: props?.selected?.website_google || '',
    website_linkedin: props?.selected?.website_linkedin || '',
    website_youtube: props?.selected?.website_youtube || '',
    whatsapp: props?.selected?.whatsapp || '',
    description: props?.selected?.description || '',
    clinic_specialities: props?.selected?.clinic_specialities || [],
    clinic_facilities: props?.selected?.clinic_facilities || [],
    profile_picture: props?.selected?.profile_picture || null,
    profile_picture_preview: props?.selected?.profile_picture_preview || null,
    error: '',
  })
  const [errorState, setErrorState] = useState({
    clinic_name: false,
    clinic_street: false,
    clinic_number: false,
    primary_phone: false,
    primary_email: false,
    multiple_phones: '',
    multiple_emails: '',
    website: false,
  })
  const [errorStateDD, setErrorStateDD] = useState({
    clinic_specialities: false,
    clinic_facilities: false,
    clinic_schedule: false,
    clinic_town: false,
    clinic_county: false,
  })

  const [mapState, setMapState] = useState({
    complete: false,
    address: '',
  })

  // Handle dropdown selection
  const onSelectDropdown = (key, value) => {
    switch (key) {
      case 'clinic_facilities': {
        setState((prevState) => ({ ...prevState, clinic_facilities: value }));
        break;
      }
      case 'clinic_specialities': {
        setState((prevState) => ({ ...prevState, clinic_specialities: value }));
        break;
      }
    }
  }

  useEffect(() => {
    setMapState({ complete: !!state.clinic_street && !!state.clinic_number && !!state.clinic_town, address: `Str. ${state.clinic_street}, nr. ${state.clinic_number}, ${state.clinic_town}` })
  }, [state.clinic_street, state.clinic_number, state.clinic_town])

  const isFormValid = () => {
    let errorCopy = _.cloneDeep(errorState)
    let errorCopyDD = _.cloneDeep(errorStateDD)

    Object.keys(errorState).forEach((key) => {
      errorCopy[key] = false;
    })

    let ok = true
    Object.keys(errorState).forEach((key) => {
      if (key === 'multiple_phones' || key === 'multiple_emails') {
        return
      }
      errorCopy[key] = !state[key]
      if (!state[key] && key !== 'multiple_phones' && key !== 'multiple_emails') {
        ok = false
      }
    })
    if (state.clinic_specialities.length === 0) {
      ok = false
      errorCopyDD.clinic_specialities = true;
    } else errorCopyDD.clinic_specialities = false;

    if (state.clinic_facilities.length === 0) {
      ok = false
      errorCopyDD.clinic_facilities = true;
    } else errorCopyDD.clinic_facilities = false;

    if (state.clinic_town.length === 0) {
      ok = false
      errorCopyDD.clinic_town = true;
    } else errorCopyDD.clinic_town = false;

    if (state.clinic_county.length === 0) {
      ok = false
      errorCopyDD.clinic_county = true;
    } else errorCopyDD.clinic_county = false;

    let isScheduleSet = false;
    for (const prop in schedule) {
      if (Array.isArray(schedule[prop]) && schedule[prop].length > 0) {
        isScheduleSet = true;
        break;
      }
    }
    if (!isScheduleSet) {
      ok = false
      errorCopyDD.clinic_schedule = true;
    } else errorCopyDD.clinic_schedule = false;

    setErrorState(errorCopy)
    setErrorStateDD(errorCopyDD)
    if (!ok) {
      setState({ ...state, error: "Va rugam sa completati campurile obligatorii" })
    }
    return ok
  }


  // Handles normal inputs
  const handleFieldChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleDDChange = (value, title) => {
    setState((prevState) => ({ ...prevState, [title]: value }));
  };

  // Profile photo user
  const profileImgRef = useRef()
  const handleProfilePictureUser = () => {
    profileImgRef.current.click();
  }
  const handleFileChangeProfilePicUser = (event) => {
    setState({ ...state, profile_picture: event.target.files[0], profile_picture_preview: window.URL.createObjectURL(event.target.files[0]) })
  }

  // States and Functions for extra phone number and emails
  const [multiplePhones, setMultiplePhones] = useState([])
  const [multiplePhoneLabels, setMultiplePhoneLabels] = useState([])
  const [multipleEmails, setMultipleEmails] = useState([])
  const addAnotherInput = (name) => {
    if (name === 'phone') {
      if (multiplePhones.length === 5) {
        setErrorState({ ...errorState, multiple_phones: 'Nu poti adauga mai mult de 6 numere' })
      } else {
        setMultiplePhones([...multiplePhones, ''])
      }
    } else if (name === 'email') {
      if (multipleEmails.length === 5) {
        setErrorState({ ...errorState, multiple_emails: 'Nu poti adauga mai mult de 6 numere' })
      } else {
        setMultipleEmails([...multipleEmails, ''])
      }
    }
  }

  const handlePhoneEmailChange = (value, index, list, fct) => {
    const copy = _.cloneDeep(list)
    copy[index] = value || 'phone'
    fct(copy)
  }

  const handleRemoveOtherInput = (index, type) => {
    if (type === 'phone') {
      if (multiplePhones.length === 5) {
        setErrorState({ ...errorState, multiple_phones: '' })
      }
      const copy = _.cloneDeep(multiplePhones)
      copy.splice(index, 1)
      setMultiplePhones(copy)
    }
    else if (type === 'email') {
      if (multipleEmails.length === 5) {
        setErrorState({ ...errorState, multiple_emails: '' })
      }
      const copy = _.cloneDeep(multipleEmails)
      copy.splice(index, 1)
      setMultipleEmails(copy)
    }
  }

  // Collaborator Clinics and Doctors
  const [toggleInviteU, setToggleInviteUnit] = React.useState(false);
  const [toggleInvite, setToggleInvite] = React.useState(false);

  const [selectedInvitedUnits, setSelectedInvitedUnits] = useState([])
  const [selectedInvitedDoctors, setSelectedInvitedDoctors] = useState([])

  const [invitedUnits, setInvitedUnits] = useState([])
  const [invitedDoctors, setInvitedDoctors] = useState([])

  const [clinics, setClinics] = useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  const [doctors, setDoctors] = useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  })

  const [errorInvite, setInviteError] = useState({
    name: false,
    email: false,
    error: false,
  })
  const [inviteValues, setInviteValues] = useState({
    name: '',
    email: '',
    message: '',
  })

  const mapResponseFromServerClinic = (resp) => {
    return {
      ...resp,
      results: resp.results.map((el) => {
        return {
          id: el.id,
          img: el.profile_picture,
          name: el.clinic_name,
          type: el.medical_unit_types.map((e) => {
            return e.label
          }).join(" | "),
          status: selectedInvitedUnits.filter((s) => s.id === el.id).length === 1 ? "added" : "uninvited",
          disabled: false
        }
      })
    }
  }
  const mapResponseFromServerDoctor = (resp) => {
    return {
      ...resp,
      results: resp.results.map((el) => {
        return {
          id: el.id,
          img: el.profile_picture,
          name: el.first_name + el.last_name,
          specialities: el.speciality.map((e) => {
            return e.label
          }),
          competences: el.medical_skill.map((e) => {
            return e.label
          }),
          unit: el.collaborator_clinic.map((e) => {
            return e.clinic_name
          }).join(' | '),
          email: el.primary_email,
          status: selectedInvitedDoctors.filter((s) => s.id === el.id).length === 1 ? "added" : "uninvited",
          disabled: false
        }
      })
    }
  }

  const remapResponseFromServerClinic = (resp) => {
    return {
      ...resp,
      results: resp.results.map((el) => {
        return {
          ...el,
          disabled: selectedInvitedUnits.filter((s) => s.id === el.id).length === 1
        }
      })
    }
  }
  const remapResponseFromServerDoctor = (resp) => {
    return {
      ...resp,
      results: resp.results.map((el) => {
        return {
          ...el,
          disabled: selectedInvitedDoctors.filter((s) => s.id === el.id).length === 1
        }
      })
    }
  }

  const handleInputClinic = (event) => {
    event.preventDefault();
    const searchTerm = event.target.value
    if (searchTerm === "") {
      setClinics(initialPaginated)
      return
    }
    const link = '?page=1&page_size=4&name=' + event.target.value
    fetch(getAPILink(API_MAP.GET_CLINICS_FILTER + link), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        setClinics(mapResponseFromServerClinic(response))
      })
      .catch((err) => { })
  }
  const handleInputDoctor = (event) => {
    event.preventDefault();
    const searchTerm = event.target.value
    if (searchTerm === "") {
      setDoctors(initialPaginated)
      return
    }
    const link = '?page=1&page_size=4&name=' + event.target.value
    fetch(getAPILink(API_MAP.GET_DOCTOR_FILTERED + link), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        setDoctors(mapResponseFromServerDoctor(response))
      })
      .catch((err) => { })
  }
  const handleClickUnit = (selectedElem) => {
    let copyElem = { ...selectedElem, status: "added" }
    let copy = [...selectedInvitedUnits]
    let index = copy.findIndex(obj => obj.id === selectedElem.id);
    if (index !== -1) {
      copy.splice(index, 1);
    } else {
      copy.push(copyElem);
    }
    setSelectedInvitedUnits(copy)
    setClinics(remapResponseFromServerClinic(clinics))
  }
  useEffect(() => {
    setClinics(remapResponseFromServerClinic(clinics))
  }, [selectedInvitedUnits])

  const handleClickDoctor = (selectedElem) => {
    let copyElem = { ...selectedElem, status: "added" }
    let copy = [...selectedInvitedDoctors]
    let index = copy.findIndex(obj => obj.id === selectedElem.id);
    if (index !== -1) {
      copy.splice(index, 1);
    } else {
      copy.push(copyElem);
    }
    setSelectedInvitedDoctors(copy)
    setDoctors(remapResponseFromServerDoctor(doctors))
  }
  useEffect(() => {
    setDoctors(remapResponseFromServerDoctor(doctors))
  }, [selectedInvitedDoctors])

  const handleFieldChangeInvite = (value, title) => {
    setInviteValues((prevState) => ({ ...prevState, [title]: value }));
  };

  const inviteUnit = () => {
    let ok = false
    let errorCopy = _.cloneDeep(errorInvite)
    if (!inviteValues.name) {
      errorCopy.name = true
      ok = true
    }
    if (!inviteValues.email) {
      errorCopy.email = true
      ok = true
    }
    if (ok) {
      setInviteError(errorCopy)
      return
    }

    const body = JSON.stringify({
      'to_sent': inviteValues.name,
      'email': inviteValues.email,
      'message': inviteValues.message,
      'from_sent': state.firstName + ' ' + state.lastName,
      'from_type': 'doctor'
    })

    makeRequestLogged(
      getAPILink(API_MAP.POST_INVITE_CLINIC),
      'POST',
      body,
      getAuthTokenFromLocal(),
    ).then((response) => response.json())
      .then((resp) => {
        if (resp.success) {
          setInvitedUnits([...invitedUnits, {
            id: -1,
            img: "/images/user.svg",
            status: "waiting",
            type: '',
            name: inviteValues.name,
          }])
          setInviteValues({
            name: '',
            email: '',
            message: '',
          })
          setInviteError({
            name: false,
            email: false,
            error: false,
          })
          setToggleInviteUnit(false)
        } else {
          setInviteError({
            name: false,
            email: false,
            error: 'A aparut o eroare',
          })
        }
      })
      .catch((err) => {
        setInviteError({
          name: false,
          email: false,
          error: 'A aparut o eroare',
        })
      })
  }
  const inviteDoctor = () => {
    let ok = false
    let errorCopy = _.cloneDeep(errorInvite)
    if (!inviteValues.name) {
      errorCopy.name = true
      ok = true
    }
    if (!inviteValues.email) {
      errorCopy.email = true
      ok = true
    }
    if (ok) {
      setInviteError(errorCopy)
      return
    }

    const body = JSON.stringify({
      'to_sent': inviteValues.name,
      'email': inviteValues.email,
      'message': inviteValues.message,
      'from_sent': state.firstName + ' ' + state.lastName,
      'from_type': 'doctor'
    })

    makeRequestLogged(
      getAPILink(API_MAP.POST_INVITE_DOCTOR),
      'POST',
      body,
      getAuthTokenFromLocal(),
    ).then((response) => response.json())
      .then((resp) => {
        if (resp.success) {
          setInvitedDoctors([...invitedDoctors, {
            id: -1,
            img: "/images/user.svg",
            specialities: [],
            competences: [],
            unit: '',
            status: "waiting",
            type: '',
            name: inviteValues.name,
            email: inviteValues.email,
          }])
          setInviteValues({
            name: '',
            email: '',
            message: '',
          })
          setInviteError({
            name: false,
            email: false,
            error: false,
          })
          setToggleInvite(false)
        } else {
          setInviteError({
            name: false,
            email: false,
            error: 'A aparut o eroare',
          })
        }
      })
      .catch((err) => {
        setInviteError({
          name: false,
          email: false,
          error: 'A aparut o eroare',
        })
      })
  }
  const toggleInviteDoctor = (toggleInvite) => {
    setToggleInvite(toggleInvite);
    setToggleInviteUnit(false)
  }
  const toggleInviteUnit = (toggleInviteU) => {
    setToggleInviteUnit(toggleInviteU);
    setToggleInvite(false)
  }
  const renderSendInvite = (ftc, word) => {
    return (
      <div className="invite-container">
        <div className="container-subtitle">
          <span className="container-title">Invitați {word}</span>
          <span className="close" onClick={() => {
            if (word === 'medic') toggleInviteDoctor(false)
            else toggleInviteUnit(false)
          }}>x</span>
        </div>
        <div className="col-1">
          <div className="input-wrapper">
            <label>*Nume {word}</label>
            <input className={errorInvite.name ? 'error' : ''} name="name" type="text" value={inviteValues.name}
              onChange={(e) => {
                handleFieldChangeInvite(e.target.value, e.target.name);
              }} />
          </div>
        </div>
        <div className="col-1">
          <div className="input-wrapper">
            <label>*Adresa email</label>
            <input className={errorInvite.email ? 'error' : ''} name="email" type="text" value={inviteValues.email}
              onChange={(e) => {
                handleFieldChangeInvite(e.target.value, e.target.name);
              }} />
          </div>
        </div>
        <div className="textarea-column">
          <label>Personalizeaza mesaj</label>
          <textarea rows="15" className="full-width" name="message" value={inviteValues.message}
            onChange={(e) => {
              handleFieldChangeInvite(e.target.value, e.target.name);
            }} />
        </div>
        {
          errorInvite.error && <p className={'error'}>{errorInvite.errors}</p>
        }
        <div className="button round custom-width" onClick={ftc}> Trimiteți invitație </div>
      </div>
    )
  }


  // Dropdown States
  const [unitTypeDropdown, setUnitTypeDropdown] = useState([])
  const [clinicSpecialities, setClinicSpecialities] = useState([])
  const [medicalFacilities, setMedicalFacilities] = useState([])

  // Schedule
  const [schedule, setSchedule] = React.useState(days);
  const [activeDay, setActiveDay] = React.useState("Luni");
  const [interval, setInterval] = React.useState({
    startTime: '00:00',
    endTime: '00:00'
  })
  const handleRemoveTime = (index) => {
    const copy = _.cloneDeep(schedule[activeDay])
    copy.splice(index, 1)
    setSchedule({ ...schedule, [activeDay]: copy })
  }


  const mapStateToObject = () => {
    return {
      // 1st card
      clinic_name: state.clinic_name,
      clinic_street: state.clinic_street,
      clinic_number: state.clinic_number,
      clinic_town: state.clinic_town,
      clinic_county: state.clinic_county,
      clinic_other_details: state.clinic_other_details,
      primary_phone: JSON.stringify({ label: state.primary_phone_label, value: state.primary_phone }),
      secondary_phone: multiplePhones,
      secondary_phone_labels: multiplePhoneLabels,
      primary_email: state.primary_email,
      secondary_email: multipleEmails.join("|"),
      website: state.website,
      website_facebook: state.website_facebook,
      website_google: state.website_google,
      website_linkedin: state.website_linkedin,
      website_youtube: state.website_youtube,
      profile_picture: state.profile_picture,
      ana: { label: multiplePhoneLabels, value: multiplePhones },
      // 2nd card
      description: state.description,
      // 4th card
      doctor: selectedInvitedDoctors.map((d) => { return d.id }).join("|"),
      clinic: selectedInvitedUnits.map((d) => { return d.id }).join("|"),

      // 5th
      clinic_specialities: state.clinic_specialities.length< 1 ? state.clinic_specialities.value : state.clinic_specialities.map(el => { return el.value }),
      // 6th
      clinic_facilities: state.clinic_facilities.length< 1 ? state.clinic_facilities.value : state.clinic_facilities.map(el => { return el.value }),
      // 7th
      clinic_schedule: JSON.stringify(schedule),
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) return
    if (props.onSubmit) {
      props.onSubmit(mapStateToObject())
    } else {
      const secondary_phones_sorted = multiplePhoneLabels.map(function (value, index) {
        return [value, multiplePhones[index]]
      });
      const mapped = mapStateToObject()
      const formData = new FormData()
      formData.append('clinic_name', mapped.clinic_name)
      formData.append('profile_picture', mapped.clinic_name)
      formData.append('clinic_street', mapped.clinic_street)
      formData.append('clinic_number', mapped.clinic_number)
      formData.append('clinic_town', mapped.clinic_town)
      formData.append('clinic_county', mapped.clinic_county)
      formData.append('clinic_other_details', mapped.clinic_other_details)
      formData.append('primary_phone', mapped.primary_phone)
      formData.append('secondary_phone', JSON.stringify(secondary_phones_sorted))
      formData.append('primary_email', mapped.primary_email)
      formData.append('secondary_email', mapped.secondary_email)
      formData.append('website', mapped.website)
      formData.append('website_facebook', mapped.website_facebook)
      formData.append('website_google', mapped.website_google)
      formData.append('website_linkedin', mapped.website_linkedin)
      formData.append('website_youtube', mapped.website_youtube)
      formData.append('description', mapped.description)
      formData.append('clinic_specialities', JSON.stringify(mapped.clinic_specialities))
      formData.append('clinic_facilities', JSON.stringify(mapped.clinic_facilities))
      formData.append('clinic_schedule', mapped.clinic_schedule)
      formData.append('clinic', mapped.clinic)
      formData.append('doctor', mapped.doctor)
      makeRequestLogged(
        getAPILink(API_MAP.PUT_UPDATE_CLINIC_PROFILE),
        'PUT',
        formData,
        getAuthTokenFromLocal(),
        'multipart/form-data'
      )
        .then((response) => response.json())
        .then((resp) => {
          if (resp.success) navigate(routes.THANK_YOU)
        })
        .catch((err) => { })
    }
  };

  // useEffect
  // get all options for dropdowns - kinda componentDidMount
  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => { return { value: el.id, label: el.label } })
        setUnitTypeDropdown(mapped)
      })
      .catch((err) => { })
    fetch(getAPILink(API_MAP.GET_CLINIC_SPECIALITIES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => { return { value: el.id, label: el.label } })
        setClinicSpecialities(mapped)
      })
      .catch((err) => { })
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
        setLoading(false)
      })
      .catch((err) => { })
  }, [])


  const [cities, setCities] = React.useState([])
  const judete = JUD_ORA.judete.map((el) => { return { value: el.auto, label: el.nume } })

  const getCitiesForCounty = (val) => {
    handleDDChange(val, 'county')
    const found = JUD_ORA.judete.filter((sd) => sd.auto === val.value)
    if (found.length > 0) {
      const mapped = found[0].localitati.map((loc) => { return { value: loc.nume, label: loc.nume } })
      setCities(mapped)
    }
    handleDDChange(val.label, 'clinic_county');
  }

  const setCity = (val) => {
    handleDDChange(val.value, 'clinic_town');
  }

  // Renders
  const renderContactData = () => {
    return (
      <div className="contact-data">
        <div className="container-title-small profile-photo">
          Date de contact profil
          <div className="col desktop pp">
            <span onClick={handleProfilePictureUser} className={'add-photo'}>Adaugă poză de profil</span>
            <input type="file" accept="image/*" onChange={handleFileChangeProfilePicUser} ref={profileImgRef} style={{ display: 'none' }} />
            <img alt='profile uploaded user' src={state.profile_picture_preview ? state.profile_picture_preview : '/images/user.svg'} />
          </div>
        </div>
        <div className="fields-wrapper">
          <div className="col">
            <div className="input-wrapper">
              <label>*Denumirea unității medicale</label>
              <input className={errorState.clinic_name ? 'error' : ''} name="clinic_name" type="text"
                value={state.clinic_name} onChange={handleFieldChange} placeholder={'Denumirea'} />
            </div>
          </div>
          <div className="col-3">
            <div className="input-wrapper">
              <label>*Strada</label>
              <input className={errorState.clinic_street ? 'error' : ''} name="clinic_street" type="text"
                value={state.clinic_street} onChange={handleFieldChange} placeholder={'Numele strazii'} />
            </div>
            <div className="input-wrapper">
              <label>*Numarul strazii</label>
              <input className={errorState.clinic_number ? 'error' : ''} name="clinic_number" type="text"
                value={state.clinic_number} onChange={handleFieldChange} placeholder={'Numarul'} />
            </div>
          </div>
          <div className="col-3">
            <div className="input-wrapper">
              <Dropdown hasError={errorStateDD.clinic_county} noNumber title={"Judet*"} onSelect={getCitiesForCounty} options={judete} isMulti={false} />
            </div>
            <div className="input-wrapper">
            <Dropdown hasError={errorStateDD.clinic_town} noNumber title={"Oras*"} onSelect={setCity} options={cities} isMulti={false} />
            </div>
          </div>
          <div className="col">
            <div className="input-wrapper">
              <label>Alte detalii</label>
              <input name="clinic_other_details" type="text"
                value={state.clinic_other_details} onChange={handleFieldChange}
                placeholder={'Alte detalii utile despre locatie'}
              />
            </div>
          </div>
        </div>
        <MapWrapper
          classes={'map-clinic-page'}
          location={mapState.complete ? [{ address: mapState.address, name: state.clinic_name, description: state.clinic_other_details }] : []}
        ></MapWrapper>
        <div className="fields-wrapper flex">
          <div className="field-container">
            <label>*Denumire telefon</label>
            <select name="primary_phone_label" id="searching" onChange={handleFieldChange} required>
              <option value="phone">Telefon</option>
              <option value="emergency">Urgente</option>
              <option value="ambulance">Ambulanta</option>
              <option value="contact">Contact</option>
              <option value="call-center">Call center</option>
              <option value="reception">Receptie</option>
              <option value="fax">Fax</option>
            </select>
            <label>*Telefon</label>
            <input className={errorState.primary_phone && 'error'} name="primary_phone" type="text"
              value={state.primary_phone} onChange={handleFieldChange} />
            {
              multiplePhones.map((el, index) => {
                return (
                  <div className={'extra_data_row'} key={index}>
                    <label>*Denumire telefon</label>
                    <select name={index.toString()} id="searching" onChange={(e) => handlePhoneEmailChange(e.target.value, index, multiplePhoneLabels, setMultiplePhoneLabels)}>
                      <option value="phone">Telefon</option>
                      <option value="emergency">Urgente</option>
                      <option value="ambulance">Ambulanta</option>
                      <option value="contact">Contact</option>
                      <option value="call-center">Call center</option>
                      <option value="reception">Receptie</option>
                      <option value="fax">Fax</option>
                    </select>
                    <label>*Telefon</label>
                    <input name={index.toString()} type="text"
                      value={el} onChange={(e) => handlePhoneEmailChange(e.target.value, index, multiplePhones, setMultiplePhones)} />
                    <img alt="close button" src={'/images/close_btn.svg'} onClick={() => handleRemoveOtherInput(index, 'phone')} />
                  </div>
                )
              })
            }
            {
              errorState.multiple_phones && <span className={'error small-margin-top'}>{errorState.multiple_phones}</span>
            }
            <div className="add-another" onClick={() => addAnotherInput('phone')}>
              <img alt={'adauga inca un numar'} src="/images/add.svg" />
              <span>Adauga inca un numar</span>
            </div>
          </div>
          <div className="field-container">
            <label>*Email</label>
            <input className={errorState.primary_email && 'error'} name="primary_email" type="text"
              value={state.primary_email} onChange={handleFieldChange} placeholder={'Email contact'} />
            {
              multipleEmails.map((el, index) => {
                return (
                  <div className={'extra_data_row'} key={index}>
                    <input name={index.toString()} type="text" placeholder={`Al ${index + 2}-lea email`}
                      value={el} onChange={(e) => handlePhoneEmailChange(e.target.value, index, multipleEmails, setMultipleEmails)} />
                    <img alt="Imagine inchidere" src={'/images/close_btn.svg'} onClick={() => handleRemoveOtherInput(index, 'email')} />
                  </div>
                )
              })
            }
            {
              errorState.multiple_emails && <span className={'error small-margin-top'}>{errorState.multiple_emails}</span>
            }
            <div className="add-another" onClick={() => addAnotherInput('email')}>
              <img alt={'adauga inca un email'} src="/images/add.svg" />
              <span>Adauga inca un email</span>
            </div>
          </div>
        </div>
        <div className="fields-wrapper">
          <div className="col-85">
            <div className="input-wrapper">
              <label>*Adresa website</label>
              <input className={errorState.website ? 'error' : ''} name="website" type="text" value={state.website}
                onChange={handleFieldChange} placeholder={'ex. www.sofarfarm.ro'} />
            </div>
          </div>
          <div className="col-5">
            <div className="input-wrapper">
              <label>Profil Facebook</label>
              <input name="website_facebook" type="text" value={state.website_facebook} onChange={handleFieldChange}
                placeholder={'Facebook link'} />
            </div>
            <div className="input-wrapper">
              <label>Profil Google</label>
              <input name="website_google" type="text" value={state.website_google} onChange={handleFieldChange}
                placeholder={'Google link'} />
            </div>
            <div className="input-wrapper">
              <label>Profil Linkedin</label>
              <input name="website_linkedin" type="text" value={state.website_linkedin} onChange={handleFieldChange}
                placeholder={'LinkedIn link'} />
            </div>
            <div className="input-wrapper">
              <label>Youtube</label>
              <input name="website_youtube" type="text" value={state.website_youtube} onChange={handleFieldChange}
                placeholder={'LinkedIn link'} />
            </div>
            <div className="input-wrapper">
              <label>Whatsapp</label>
              <input name="whatsapp" type="text" value={state.whatsapp} onChange={handleFieldChange}
                placeholder={'Whatsapp'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderDescription = () => {
    return (
      <div className="contact-data">
        <div className="container-title-small">
          Descriere Unitate
        </div>
        <div className="fields-wrapper">
          <textarea placeholder={'Scrieti o descriere a unitatii dumneavoastra.'} className={'textarea-description'}
            value={state.description} name="description" onChange={handleFieldChange} maxLength='500'
          />
          <div className="counter"> {state.description.length} / 500 </div>
        </div>
      </div>
    )
  }

  const renderCollaboratorsClinic = () => {
    return (
      <div className="collab-unit-data">
        <div className="container-title">Unitate medicală colaboratoare</div>
        <div className="fields-wrapper">
          <input onChange={handleInputClinic} className="search" type="text" placeholder="Cautați unitate medicală" name="name" />
          {!toggleInviteU
            ? <div className={`button border-button round invite-btn`} onClick={() => toggleInviteUnit(true)}>Nu ai gasit ce cautai? Invita o unitate medicala!</div>
            : renderSendInvite(inviteUnit, 'unitate medicala')
          }
          {
            clinics.count !== 0 &&
            clinics.results.map((cl) => {
              return <InviteCard disable type="unit" unit={cl} onClick={handleClickUnit} />
            })
          }
          {
            selectedInvitedUnits.length > 0 &&
            <React.Fragment>
              <p>Unități medicale adăugate</p>
              {selectedInvitedUnits.map((invited, i) => {
                return (
                  <InviteCard type="unit" unit={invited} onClick={handleClickUnit} />
                )
              })}
            </React.Fragment>
          }
          {
            invitedUnits.length > 0 &&
            <React.Fragment>
              <p>Unități medicale adăugate</p>
              {invitedUnits.map((invited, i) => {
                return (
                  <InviteCard type="unit" unit={invited} />
                )
              })}
            </React.Fragment>
          }

        </div>
      </div>
    )
  }

  const renderCollaboratorsDoctor = () => {
    return (
      <div className="collab-doctors-data">
        <div className="container-title">Medici colaboratoari</div>
        <div className="fields-wrapper">
          <input onChange={handleInputDoctor} className="search" type="text" placeholder="Cauta medic" name="name" />
          {!toggleInvite
            ? <div className={`button border-button round invite-btn`} onClick={() => toggleInviteDoctor(true)}>Nu ai gasit ce cautai? Invita un doctor!</div>
            : renderSendInvite(inviteDoctor, 'medic')
          }
          {
            doctors.count !== 0 &&
            doctors.results.map((cl) => {
              return <InviteCard disable type="doctor" doctor={cl} onClick={handleClickDoctor} />
            })
          }
          {
            selectedInvitedDoctors.length > 0 &&
            <React.Fragment>
              <p>Doctori colaboratori adăugati</p>
              {selectedInvitedDoctors.map((invited, i) => {
                return (
                  <InviteCard type="doctor" doctor={invited} onClick={handleClickDoctor} />
                )
              })}
            </React.Fragment>
          }
          {
            invitedDoctors.length > 0 &&
            <React.Fragment>
              <p>Doctori colaboratori invitati</p>
              {invitedDoctors.map((invited, i) => {
                return (
                  <InviteCard type="doctor" doctor={invited} />
                )
              })}
            </React.Fragment>
          }
        </div>
      </div>
    )
  }

  const renderSpecialities = () => {
    return (
      <div className="specialities-container">
        <Dropdown hasError={errorStateDD.clinic_specialities} selected={state.clinic_specialities} options={clinicSpecialities}
          isMulti title="Specialitati unitate*" onSelect={(values) => { onSelectDropdown('clinic_specialities', values) }} />
      </div>
    )
  }
  const renderFacilities = () => {
    return (
      <div className="facilities-container">
        <Dropdown hasError={errorStateDD.clinic_facilities} selected={state.clinic_facilities} options={medicalFacilities}
          isMulti title="Facilitati unitate*" onSelect={(values) => { onSelectDropdown('clinic_facilities', values) }} />
      </div>
    )
  }
  const renderSchedule = () => {
    return (
      <div className={`schedule-container ${errorStateDD.clinic_schedule ? 'err' : ''}`}>
        <div className="container-title-small"> Program* </div>
        <div className="fields-wrapper">
          <div className="weekdays-container">
            {Object.entries(schedule).map(([weekday, inter], i) => {
              return (
                <div className={"day" + (activeDay === weekday ? " active" : '')}
                  onClick={() => setActiveDay(weekday)} key={i}
                >
                  <span>{weekday}</span>
                  {inter.map((interval, index) => {
                    return <span key={index} className={'interval'}>
                      {interval.startTime} - {interval.endTime}
                      <img alt="buton inchis" src={'/images/close_btn.svg'} onClick={() => handleRemoveTime(index)} />
                    </span>
                  })}
                </div>
              )
            })}
          </div>
          <div className="time-wrapper">
            <div className="time-container">
              <div className="start-time">
                <span>De la ora: </span>
                <input type="time" name="startTime" value={interval.startTime} min="00:00" max="23:59" required
                  onChange={(e) => { setInterval({ ...interval, startTime: e.target.value }) }}
                />
              </div>
              <div className="end-time">
                <span>Pana la ora: </span>
                <input type="time" name="endTime" value={interval.endTime} min="00:00" max="23:59" required
                  onChange={(e) => { setInterval({ ...interval, endTime: e.target.value }) }}
                />
              </div>
            </div>
            <div className="button border-button"
              onClick={() => {
                setSchedule({ ...schedule, [activeDay]: [...schedule[activeDay], { startTime: interval.startTime, endTime: interval.endTime }] })
                setInterval({ startTime: '00:00', endTime: '23:59' })
              }}
            >
              Adauga
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="clinic-profile-page">
      <div className="data-container">
        <img alt={'Unitate medicala'} src="/images/unit.svg" />
        <h1>Profil</h1>
        {
          loading
            ? <LoadingSpinner />
            : (
              <form onSubmit={handleSubmit}>
                {renderContactData()}
                {renderDescription()}
                {renderCollaboratorsClinic()}
                {renderCollaboratorsDoctor()}
                {renderSpecialities()}
                {renderFacilities()}
                {renderSchedule()}
                {
                  state.error && <div style={{ marginBottom: '15px' }} className={'error'}>{state.error}</div>
                }
                <button className="button round " onClick={handleSubmit} >Salveaza</button>
              </form>
            )
        }
      </div>
    </div>
  )
}
export default ClinicProfile;
