import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicProfile.scss";
import _ from 'lodash';
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import MapWrapper from "../../components/Map/Map";

const days = {
  'Luni': [],
  'Marti': [],
  'Miercuri': [],
  'Joi': [],
  'Vineri': [],
  'Sambata': [],
  'Duminica': []
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

  const [mapState, setMapState] = useState({
    complete: false,
    address: '',
  })

  useEffect(() => {
    setMapState({ complete: !!state.clinic_street && !!state.clinic_number && !!state.clinic_town, address: `Str. ${state.clinic_street}, nr. ${state.clinic_number}, ${state.clinic_town}` })
  }, [state.clinic_street, state.clinic_number, state.clinic_town])

  const isFormValid = () => {
    let errorCopy = _.cloneDeep(errorState)
    let ok = true
    Object.keys(errorState).forEach((key) => {
      errorCopy[key] = !state[key]
      if (!state[key] && key !== 'multiple_phones' && key !== 'multiple_emails') {
        ok = false
      }
    })
    setErrorState(errorCopy)
    if (!ok) {
      console.log("INTRA")
      setState({ ...state, error: "Va rugam sa completati campurile obligatorii" })
    }
    return ok
  }


  // Handles normal inputs
  const handleFieldChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // Handle dropdown selection
  const onSelectDropdown = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

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
    console.log(value, 'VALOARE')
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

  // State and Functions for doctor
  const [doctor, setDoctor] = useState([{
    name: '',
    academic_degree: [],
    speciality: [],
    competences: [],
    link: '',
    profile_photo: null,
    profile_picture_preview: null,
  }])
  const [docHighlighted, setDocHighlighted] = useState(0)
  const inputRefDoctor = useRef();
  const addDoctor = () => {
    setDoctor([...doctor, { name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: null, profile_picture_preview: null }])
  }
  const handleDoctorPhotoUploadClickDoctor = () => {
    inputRefDoctor.current.click();
  };
  const handleFileChangeDoctor = (event) => {
    const copy = _.cloneDeep(doctor)
    copy[docHighlighted].profile_photo = event.target.files[0]
    copy[docHighlighted].profile_picture_preview = window.URL.createObjectURL(event.target.files[0])
    setDoctor(copy)
  }
  const deleteHighlightDoctor = (index) => {
    if (index === 0) {
      setDoctor([{ name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: null, profile_picture_preview: null }])
    } else {
      const copy = _.cloneDeep(doctor)
      copy.splice(index, 1)
      setDoctor(copy)
      setDocHighlighted(docHighlighted - 1)
    }
  }
  const handleChangeInputDoctor = (event, index) => {
    const copy = _.cloneDeep(doctor)
    copy[index][event.target.name] = event.target.value
    setDoctor(copy)
  }
  const handleDropdownDoctor = (event, index, label) => {
    const copy = _.cloneDeep(doctor)
    copy[index][label] = event
    setDoctor(copy)

  }
  const saveCurrentDoctor = () => {
    setDoctor([...doctor, { name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: null, profile_picture_preview: null }])
    setDocHighlighted(docHighlighted + 1)
  }
  // Dropdown States
  const [unitTypeDropdown, setUnitTypeDropdown] = useState([])
  const [academicDegreesDropDown, setAcademicDegreesDropDown] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [competences, setCompetences] = useState([])
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
      doctors: doctor.filter((el) => el.name)
        .map((doc) => {
          return {
            name: doc.name,
            profile_photo: doc.profile_photo || '/images/user.svg',
            link: doc.link,
            academic_degree: doc.academic_degree.map((md) => { return md.value }),
            speciality: doc.speciality.map((md) => { return md.value }),
            competences: doc.competences.map((md) => { return md.value }),
          }
        }),
      // 5th
      clinic_specialities: state.clinic_specialities.map(el => { return el.value }),
      // 6th
      clinic_facilities: state.clinic_facilities.map(el => { return el.value }),
      // 7th
      clinic_schedule: JSON.stringify(schedule),
    }
  }

  const handleSubmit = (event) => {
    console.log('STATE:', state)
    console.log('MAP:', mapStateToObject())
    event.preventDefault();
    if (!isFormValid()) return
    if (props.onSubmit) {
      //TODO PLS CHECK THIS;
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

      formData.append('doctor', JSON.stringify(mapped.doctors))
      doctor.forEach((el, index) => {
        const key = el.name.split(' ').join('|') + '_doc_' + index
        formData.append(key, el.profile_photo)
      })
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
              <label>*Oras</label>
              <select id="clinic_town" name="clinic_town" onChange={handleFieldChange}>
                <option value="Alba-Iulia">Alba-Iulia</option>
                <option value="Cluj-Napoca">Cluj-Napoca</option>
                <option value="Bucuresti">Bucuresti</option>
                <option value="Sibiu">Sibiu</option>
              </select>
            </div>
            <div className="input-wrapper">
              <label>*Judet</label>
              <select id="county" name="county" onChange={handleFieldChange}>
                <option value="Alba">Alba</option>
                <option value="Cluj">Cluj</option>
                <option value="Bucuresti">Bucuresti</option>
                <option value="Sibiu">Sibiu</option>
              </select>
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
  const renderDoctors = () => {
    return (
      <div className="hq-container">
        <div className="container-title-small">
          Medici colaboratori
        </div>
        <div className="fields-wrapper">
          <div className="col-4">
            {
              doctor.map((doc, index) => {
                return (
                  <div key={index} onClick={() => setDocHighlighted(index)} className={`card-HQ ${docHighlighted === index && 'highlight'}`}>
                    <img alt="Imagine profile doctor" src={doc.profile_picture_preview ? doc.profile_picture_preview : '/images/user.svg'} />
                    <div className={'hq-data'}>
                      <div>{doc.name}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="add-another" onClick={addDoctor}>
            <img alt="adauga inca un doctor/medic" src="/images/add.svg" />
            <span>Adauga medic</span>
          </div>

          <div className="col">
            <span onClick={handleDoctorPhotoUploadClickDoctor} className={'add-photo'}>Incarca poza profil</span>
            <input type="file" accept="image/*" onChange={handleFileChangeDoctor} ref={inputRefDoctor} style={{ display: 'none' }} />
          </div>
          <div className="col">
            <div className="input-wrapper">
              <label>Medic</label>
              <input placeholder="nume" name='name' type="text" value={doctor[docHighlighted].name}
                onChange={(e) => { handleChangeInputDoctor(e, docHighlighted); }} />
            </div>
          </div>
          <Dropdown noNumber selected={doctor[docHighlighted].academic_degree}
            onSelect={(values) => {
              handleDropdownDoctor(values, docHighlighted, 'academic_degree')
            }}
            options={academicDegreesDropDown}
            title="Grad Academic" />
          <Dropdown noNumber selected={doctor[docHighlighted].speciality}
            onSelect={(values) => {
              handleDropdownDoctor(values, docHighlighted, 'speciality')
            }}
            options={specialities}
            title="Specializare" />
          <Dropdown noNumber selected={doctor[docHighlighted].competences}
            onSelect={(values) => {
              handleDropdownDoctor(values, docHighlighted, 'competences')
            }}
            options={competences}
            title="Competente" />

          <div className="col">
            <div className="input-wrapper">
              <label>Link pagina </label>
              <input name="link" type="text" value={doctor[docHighlighted].link}
                onChange={(e) => { handleChangeInputDoctor(e, docHighlighted); }} />
            </div>
          </div>
          <div className="delete-button" onClick={() => deleteHighlightDoctor(docHighlighted)}>
            <div>
              sterge unitate
            </div>
          </div>
          <div className="button border-button" onClick={saveCurrentDoctor}>
            Salveaza
          </div>
        </div>
      </div>
    )
  }
  const renderSpecialities = () => {
    return (
      <div className="specialities-container">
        <Dropdown selected={state.clinic_specialities} options={clinicSpecialities}
          title="Specialitati unitate" onSelect={(values) => { onSelectDropdown('clinic_specialities', values) }} />
      </div>
    )
  }
  const renderFacilities = () => {
    return (
      <div className="facilities-container">
        <Dropdown selected={state.clinic_facilities} options={medicalFacilities}
          title="Facilitati unitate" onSelect={(values) => { onSelectDropdown('clinic_facilities', values) }} />
      </div>
    )
  }
  const renderSchedule = () => {
    return (
      <div className="schedule-container">
        <div className="container-title-small"> Program </div>
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
                {renderDoctors()}
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
