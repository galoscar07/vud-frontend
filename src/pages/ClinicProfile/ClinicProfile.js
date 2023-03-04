import React, {useEffect, useRef, useState} from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicProfile.scss";
import _ from 'lodash';
import {API_MAP, getAPILink} from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const days = {
  'Luni': [],
  'Marti': [],
  'Miercuri': [],
  'Joi': [],
  'Vineri': [],
  'Sambata': [],
  'Duminica': []
}


const ClinicProfile = () => {
  // Loading var
  const [loading, setLoading] = useState(true)

  // Inputs state
  const [state, setState] = useState({
    clinic_name: '',
    clinic_street: '',
    clinic_number: '',
    clinic_town: '',
    clinic_county: '',
    clinic_other_details: '',
    primary_phone: '',
    primary_email: '',
    website: '',
    website_facebook: '',
    website_google: '',
    website_linkedin: '',
    website_youtube: '',
    description: '',
    clinic_specialities: [],
    clinic_facilities: [],
  })
  const [errorState, setErrorState] = useState({
    clinic_name: '',
    clinic_street: '',
    clinic_number: '',
    clinic_town: '',
    clinic_county: '',
    clinic_other_details: '',
    primary_phone: '',
    primary_email: '',
    multiple_phones: '',
    multiple_emails: '',
    website: '',
    website_facebook: '',
    website_google: '',
    website_linkedin: '',
    website_youtube: '',
    description: '',
  })

  // Handles normal inputs
  const handleFieldChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // Handle dropdown selection
  const onSelectDropdown = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

  // States and Functions for extra phone number and emails
  const [multiplePhones, setMultiplePhones] = useState([])
  const [multipleEmails, setMultipleEmails] = useState([])
  const addAnotherInput = (name) => {
    if (name === 'phone') {
      if (multiplePhones.length === 5) {
        setErrorState({...errorState, multiple_phones: 'Nu poti adauga mai mult de 6 numere'})
      } else {
        setMultiplePhones([...multiplePhones, ''])
      }
    } else if (name === 'email') {
      if (multipleEmails.length === 5) {
        setErrorState({...errorState, multiple_emails: 'Nu poti adauga mai mult de 6 numere'})
      } else {
        setMultipleEmails([...multipleEmails, ''])
      }
    }
  }
  const handlePhoneEmailChange = (value, index, list, fct) => {
    const copy =  _.cloneDeep(list)
    copy[index] = value
    fct(copy)
  }
  const handleRemoveOtherInput = (index, type) => {
    if (type === 'phone') {
      if (multiplePhones.length === 5) {
        setErrorState({...errorState, multiple_phones: ''})
      }
      const copy =  _.cloneDeep(multiplePhones)
      copy.splice(index, 1)
      setMultiplePhones(copy)
    }
    else if (type === 'email') {
      if (multipleEmails.length === 5) {
        setErrorState({...errorState, multiple_emails: ''})
      }
      const copy =  _.cloneDeep(multipleEmails)
      copy.splice(index, 1)
      setMultipleEmails(copy)
    }
  }

  // State and Functions for doctor
  const [doctor, setDoctor] = useState([{
    name: '',
    academic_degree: '',
    speciality: '',
    competences: '',
    link: '',
    profile_photo: '',
  }])
  const [docHighlighted, setDocHighlighted] = useState(0)
  const inputRefDoctor = useRef();
  const addDoctor = () => {
    setDoctor([...doctor, { name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: ''}])
  }
  const handleDoctorPhotoUploadClick = () => {
    inputRefDoctor.current.click();
  };
  const handleFileChangeDoctor = (event) => {
    const img = event.target.files[0]
    const reader = new FileReader();
    // TODO Daca incerci sa pui poza a doua oara ramane tot prima. DE CEEEEEE ?
    reader.onloadend = () => {
      const copy =  _.cloneDeep(doctor)
      copy[docHighlighted].profile_picture = reader.result
      setDoctor(copy)
    };
    reader.readAsDataURL(img);
  }
  const deleteHighlightDoctor = (index) => {
    if (index === 0) {
      setDoctor([{ name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: ''}])
    } else {
      const copy =  _.cloneDeep(doctor)
      copy.splice(index, 1)
      setDoctor(copy)
      setDocHighlighted(docHighlighted - 1)
    }
  }
  const handleChangeInputDoctor = (event, index) => {
    const copy =  _.cloneDeep(doctor)
    copy[index][event.target.name] = event.target.value
    setDoctor(copy)
  }
  const handleDropdownDoctor = (event, index, label) => {
    const copy =  _.cloneDeep(doctor)
    copy[index][label] = event
    setDoctor(copy)

  }
  const saveCurrentDoctor = () => {
    setDoctor([...doctor,  { name: '', academic_degree: [], speciality: [], competences: [], link: '', profile_photo: ''}])
    setHqHighlighted(hqHighlighted + 1)
  }

  // States for HQs
  const [hq, setHq] = useState([{
    name: '',
    address: '',
    link: '',
    profile_picture: null,
    medical_unit_types: []
  }])
  const [hqHighlighted, setHqHighlighted] = useState(0)
  const inputRef = useRef();
  const handleHQPhotoUploadClick = () => {
    inputRef.current.click();
  };
  const handleFileChangeHQ = (event) => {
    const img = event.target.files[0]
    const reader = new FileReader();
    // TODO Daca incerci sa pui poza a doua oara ramane tot prima. DE CEEEEEE ?
    reader.onloadend = () => {
      const copy =  _.cloneDeep(hq)
      copy[hqHighlighted].profile_picture = reader.result
      setHq(copy)
    };
    reader.readAsDataURL(img);
  }
  const deleteHighlight = (index) => {
    if (index === 0) {
      setHq([{ name: '', address: '', link: '', profile_picture: null, medical_unit_types: []}])
    } else {
      const copy =  _.cloneDeep(hq)
      copy.splice(index, 1)
      setHq(copy)
      setHqHighlighted(hqHighlighted - 1)
    }
  }
  const handleChangeInputHQ = (event, index) => {
    const copy =  _.cloneDeep(hq)
    copy[index][event.target.name] = event.target.value
    setHq(copy)
  }
  const handleDropdownHQ = (event, index) => {
    const copy =  _.cloneDeep(hq)
    copy[index].medical_unit_types = event
    setHq(copy)

  }
  const saveCurrentHq = () => {
    setHq([...hq, { name: '', address: '', link: '', profile_picture: null, medical_unit_types: []}])
    setHqHighlighted(hqHighlighted + 1)
  }
  const addNewHq = () => {
    setHq([...hq, { name: '', address: '', link: '', profile_picture: null, medical_unit_types: []}])
  }

  // Dropdown States
  const [unitTypeDropdown, setUnitTypeDropdown] = useState ([])
  const [academicDegreesDropDown, setAcademicDegreesDropDown] = useState ([])
  const [specialities, setSpecialities] = useState ([])
  const [competences, setCompetences] = useState ([])
  const [clinicSpecialities, setClinicSpecialities] = useState ([])
  const [medicalFacilities, setMedicalFacilities] = useState ([])

  // Schedule
  const [schedule, setSchedule] = React.useState(days);
  const [activeDay, setActiveDay] = React.useState("Luni");
  const [interval, setInterval] = React.useState({
    startTime: '00:00',
    endTime: '00:00'
  })
  const handleRemoveTime = (index) => {
    const copy =  _.cloneDeep(schedule[activeDay])
    copy.splice(index, 1)
    setSchedule({...schedule, [activeDay]: copy})
  }


  const mapStateToObject = () => {

  }

  const handleSubmit = (event) => {
    console.log(state);
    event.preventDefault();
  };

  // useEffect
  // get all options for dropdowns - kinda componentDidMount
  useEffect(() => {
    fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
        setUnitTypeDropdown(mapped)
      })
      .catch((err) => {
        console.log(err)
      })
    fetch(getAPILink(API_MAP.GET_ACADEMIC_DEGREES), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
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
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
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
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
        setCompetences(mapped)
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
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
        setClinicSpecialities(mapped)
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
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
        setMedicalFacilities(mapped)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Renders
  const renderContactData = () => {
    return (
      <div className="contact-data">
        <div className="container-title">
          Date de contact profil
        </div>
        <div className="fields-wrapper">
          <div className="col">
            <div className="input-wrapper">
              <label>*Denumirea unității medicale</label>
              <input className={errorState.clinic_name && 'error'} name="clinic_name" type="text"
                     value={state.clinic_name} onChange={handleFieldChange} placeholder={'Denumirea'} />
            </div>
          </div>
          <div className="col-3">
            <div className="input-wrapper">
              <label>*Strada</label>
              <input className={errorState.clinic_street && 'error'}  name="clinic_street" type="text"
                     value={state.clinic_street}  onChange={handleFieldChange} placeholder={'Numele strazii'} />
            </div>
            <div className="input-wrapper">
              <label>Numarul strazii</label>
              <input className={errorState.clinic_number && 'error'} name="clinic_number" type="text"
                     value={state.clinic_number}  onChange={handleFieldChange} placeholder={'Numarul'}/>
            </div>
          </div>
          <div className="col-3">
            <div className="input-wrapper">
              <label>*Oras</label>
              {/* TODO Handle this properly */}
              <select id="city" name="city">
                <option value="Alba-Iulia">Alba-Iulia</option>
                <option value="Cluj-Napoca">Cluj-Napoca</option>
                <option value="Bucuresti">Bucuresti</option>
                <option value="Sibiu">Sibiu</option>
              </select>
            </div>
            <div className="input-wrapper">
              <label>Judet</label>
              {/* TODO Handle this properly */}
              <select id="county" name="county">
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
              <input className={errorState.clinic_other_details && 'error'} name="clinic_other_details" type="text"
                     value={state.clinic_other_details} onChange={handleFieldChange}
                     placeholder={'Alte detalii utile despre locatie'}
              />
            </div>
          </div>
        </div>
        {/* TODO after completing the address reposition the map */}
        <iframe
          title={'google maps'}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
          width="100%"
          height="210"
          frameBorder="0"
          style={{ border: 0, marginTop: 15 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
        <div className="fields-wrapper flex">
          <div className="field-container">
            <label>*Telefon call center</label>
            <input className={errorState.clinic_name && 'error'} name="primary_phone" type="text"
                   value={state.primary_phone}  onChange={handleFieldChange} placeholder={'Call center'} />
            {
              multiplePhones.map((el, index) => {
                return (
                  <div className={'extra_data_row'} key={index}>
                    <input name={index.toString()} type="text" placeholder={`Al ${index+2}-lea numar`}
                           value={el}  onChange={(e) => handlePhoneEmailChange(e.target.value, index, multiplePhones, setMultiplePhones)} />
                    <img src={'/images/close_btn.svg'} onClick={() => handleRemoveOtherInput(index, 'phone')} />
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
                    <input name={index.toString()} type="text" placeholder={`Al ${index+2}-lea email`}
                           value={el}  onChange={(e) => handlePhoneEmailChange(e.target.value, index, multipleEmails, setMultipleEmails)} />
                    <img src={'/images/close_btn.svg'} onClick={() => handleRemoveOtherInput(index, 'email')} />
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
          <div className="col">
            <div className="input-wrapper">
              <label>Adresa website</label>
              <input className={errorState.website && 'error'} name="website" type="text" value={state.website}
                     onChange={handleFieldChange} placeholder={'ex. www.sofarfarm.ro'} />
            </div>
          </div>
          <div className="col-4">
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
          </div>
        </div>
      </div>
    )
  }
  const renderDescription = () => {
    return (
      <div className="contact-data">
        <div className="container-title">
          Descriere Unitate
        </div>
        <div className="fields-wrapper">
              <textarea placeholder={'Scrieti o descriere a unitatii dumneavoastra.'} className={'textarea-description'}
                        value={state.description} name="description" onChange={handleFieldChange}
              />
        </div>
      </div>
    )
  }
  const renderHQ = () => {
    return (
      <div className="hq-container">
        <div className="container-title">
          Sedii
        </div>
        <div className="fields-wrapper">
          <div className="col-4">
            {
              hq.map((hqElem, index) => {
                return (
                  <div key={index} onClick={() => setHqHighlighted(index)} className={`card-HQ ${hqHighlighted === index && 'highlight'}`}>
                    <img src={hqElem.profile_picture ? hqElem.profile_picture : '/images/user.svg'}/>
                    <div className={'hq-data'}>
                      <div>{hqElem.name}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="add-another" onClick={addNewHq}>
            <img alt="adauga inca un sediu" src="/images/add.svg" />
            <span>Adauga inca un sediu</span>
          </div>

          <div className="col">
            <span onClick={handleHQPhotoUploadClick} className={'add-photo'}>Incarca poza profil</span>
            <input type="file" accept="image/*" onChange={handleFileChangeHQ} ref={inputRef} style={{ display: 'none' }} />
          </div>
          <div className="col">
            <div className="input-wrapper">
              <label>*Denumirea unitatii medicale </label>
              <input name='name' type="text" value={hq[hqHighlighted].name}
                     onChange={(e) => {handleChangeInputHQ(e, hqHighlighted);}} />
            </div>
          </div>
          <Dropdown selected={hq[hqHighlighted].medical_unit_types}
                    onSelect={(values) => {
                      handleDropdownHQ(values, hqHighlighted)}}
                    options={unitTypeDropdown}
                    title="*Tip unitate"/>
          <div className="col">
            <div className="input-wrapper">
              <label>*Adresa postala</label>
              <input name="address" type="text" value={hq[hqHighlighted].address}
                     onChange={(e) => {handleChangeInputHQ(e, hqHighlighted);}} />
            </div>
          </div>
          <div className="col">
            <div className="input-wrapper">
              <label>Link pagina </label>
              <input name="link" type="text" value={hq[hqHighlighted].link}
                     onChange={(e) => {handleChangeInputHQ(e, hqHighlighted);}} />
            </div>
          </div>
          <div className="delete-button" onClick={() => deleteHighlight(hqHighlighted)}>
            <div>
              sterge unitate
            </div>
          </div>
          <input className="button border-button" onClick={saveCurrentHq} value="Salveaza" />
        </div>
      </div>
    )
  }
  const renderDoctors = () => {
    return (
      <div className="hq-container">
        <div className="container-title">
          Medici colaboratori
        </div>
        <div className="fields-wrapper">
          <div className="col-4">
            {
              doctor.map((doc, index) => {
                return (
                  <div key={index} onClick={() => setDocHighlighted(index)} className={`card-HQ ${docHighlighted === index && 'highlight'}`}>
                    <img src={doc.profile_picture ? doc.profile_picture : '/images/user.svg'}/>
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
            <span onClick={handleDoctorPhotoUploadClick} className={'add-photo'}>Incarca poza profil</span>
            <input type="file" accept="image/*" onChange={handleFileChangeDoctor} ref={inputRef} style={{ display: 'none' }} />
          </div>
          <div className="col">
            <div className="input-wrapper">
              <label>Medic</label>
              <input placeholder="nume" name='name' type="text" value={doctor[docHighlighted].name}
                     onChange={(e) => {handleChangeInputDoctor(e, docHighlighted);}} />
            </div>
          </div>
          <Dropdown selected={doctor[docHighlighted].academic_degree}
                    onSelect={(values) => {
                      handleDropdownDoctor(values, docHighlighted, 'academic_degree')}}
                    options={academicDegreesDropDown}
                    title="Grad Academic"/>
          <Dropdown selected={doctor[docHighlighted].speciality}
                    onSelect={(values) => {
                      handleDropdownDoctor(values, docHighlighted, 'speciality')}}
                    options={specialities}
                    title="Specializare"/>
          <Dropdown selected={doctor[docHighlighted].competences}
                    onSelect={(values) => {
                      handleDropdownDoctor(values, docHighlighted, 'competences')}}
                    options={competences}
                    title="Competente"/>

          <div className="col">
            <div className="input-wrapper">
              <label>Link pagina </label>
              <input name="link" type="text" value={doctor[docHighlighted].link}
                     onChange={(e) => {handleChangeInputDoctor(e, docHighlighted);}} />
            </div>
          </div>
          <div className="delete-button" onClick={() => deleteHighlightDoctor(docHighlighted)}>
            <div>
              sterge unitate
            </div>
          </div>
          <input className="button border-button" onClick={saveCurrentDoctor} value="Salveaza" />
        </div>
      </div>
    )
  }
  const renderSpecialities = () => {
    return (
      <div className="specialities-container">
        <Dropdown selected={state.clinic_specialities} options={clinicSpecialities}
                  title="Specialitati unitate" onSelect={(values) => {onSelectDropdown('clinic_specialities', values)}} />
      </div>
    )
  }
  const renderFacilities = () => {
    return (
      <div className="facilities-container">
        <Dropdown selected={state.clinic_facilities} options={medicalFacilities}
                  title="Facilitati unitate" onSelect={(values) => {onSelectDropdown('clinic_facilities', values)}} />
      </div>
    )
  }
  const renderSchedule = () => {
    return (
      <div className="schedule-container">
        <div className="container-title"> Program </div>
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
                      <img src={'/images/close_btn.svg'} onClick={() => handleRemoveTime(index)} />
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
                       onChange={(e) => {setInterval({...interval, startTime: e.target.value})}}
                />
              </div>
              <div className="end-time">
                <span>Pana la ora: </span>
                <input type="time" name="endTime" value={interval.endTime} min="00:00" max="23:59" required
                       onChange={(e) => {setInterval({...interval, endTime: e.target.value})}}
                />
              </div>
            </div>
            <input className="button border-button" value="Adauga"
                   onClick={() => {
                     setSchedule({...schedule, [activeDay]: [...schedule[activeDay], {startTime: interval.startTime, endTime: interval.endTime}]})
                     setInterval({startTime: '00:00', endTime: '23:59'})
                   }}
            />
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
                { renderContactData() }
                { renderDescription() }
                { renderHQ() }
                { renderDoctors() }
                { renderSpecialities() }
                { renderFacilities() }
                { renderSchedule() }
                <input className="button" type="submit" value="Salveaza profilul" />
              </form>
            )
        }
      </div>
    </div>
  )
}
export default ClinicProfile;
