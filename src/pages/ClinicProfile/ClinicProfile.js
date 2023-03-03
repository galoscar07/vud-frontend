import React, {useEffect, useRef, useState} from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicProfile.scss";
import _ from 'lodash';
import {API_MAP, getAPILink} from "../../utils/routes";

const days = [
  {
    weekday: 'Luni',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Marti',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Miercuri',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Joi',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Vineri',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Sambata',
    startTime: '',
    endTime: '',
  },
  {
    weekday: 'Duminica',
    startTime: '',
    endTime: '',
  },

]

const ClinicProfile = () => {
  // Loading var
  const [loading, setLoading] = useState(false)

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

  // States for HQs
  const [hq, setHq] = useState([{
    name: 'Regina Maria',
    address: 'Buna ziua, 39, Cluj Napoca',
    link: 'www.reginamaria.ro/asdasd/asdasd',
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

  // Dropdown States
  const [unitTypeDropdown, setUnitTypeDropdown] = useState ([])

  const [values, setValues] = React.useState({});
  const [schedule, setSchedule] = React.useState(days);
  const [activeDay, setActiveDay] = React.useState({ weekday: "Luni", startTime: "00:00", endTime: "00:00" });
  const [counterHQ, setCounterHQ] = React.useState(1);

  // Handles normal inputs
  const handleFieldChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };




  const handleHQInputs = () => {
    setCounterHQ(counterHQ + 1);
    console.log(counterHQ);
  };

  const handleActiveDay = (event) => {
    if (event.target.name === 'weekday') setActiveDay((prevState) => ({ ...prevState, weekday: event.target.value }));
    if (event.target.name === 'startTime') setActiveDay((prevState) => ({ ...prevState, startTime: event.target.value }));
    if (event.target.name === 'endTime') setActiveDay((prevState) => ({ ...prevState, endTime: event.target.value }));

    // VALIDATIONS?
  };

  const handleScheduleChange = () => {
    const updatedSchedule = schedule.map(el => el.weekday !== activeDay.weekday ? el : activeDay);
    setSchedule(updatedSchedule);
  };


  const handleSubmit = (event) => {
    console.log(values);
    event.preventDefault();
  };

  // useEffect
  // get all options for dropdowns - kinda componentDidMount
  useEffect(() => {
    Promise.all(
      fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((resp) => resp.json())
        .then((response) => {
          const mapped = response.map((el) => {return {value: el.id, label: el.label}})
          setUnitTypeDropdown(mapped)
        })
        .catch((err) => {
          console.log(err)
        }),
    ).then((resp) => setLoading(false))
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

          {/*<div className="add-another" onClick={(e) => handleHQInputs()}>*/}
          {/*  <img alt="adauga inca un sediu" src="/images/add.svg" />*/}
          {/*  <span>Adauga inca un sediu</span>*/}
          {/*</div>*/}

          <div className="col" onClick={(e) => handleHQInputs()}>
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
          {/* TODO Handle giving it selected values */}
          <Dropdown selected={hq[hqHighlighted].medical_unit_types}
                    onSelect={(values) => {handleDropdownHQ(values, hqHighlighted)}}
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


  return (
    <div className="clinic-profile-page">
      <div className="data-container">
        <img alt={'Unitate medicala'} src="/images/unit.svg" />
        <h1>Profil</h1>
        <form onSubmit={handleSubmit}>
          { renderContactData() }
          { renderDescription() }
          { renderHQ() }
          <div className="specialities-container">
            {/* <div className="container-title">Specialitati</div> */}
            <Dropdown title="Specialitati unitate"/>
          </div>
          <div className="facilities-container">
            {/* <div className="container-title">Facilitati unitate</div> */}
            <Dropdown title="Facilitati unitate"/>
          </div>

          <div className="schedule-container">
            <div className="container-title"> Program </div>
            <div className="fields-wrapper">
              <div className="weekdays-container">
                {schedule.map((day, i) => {
                  return (
                    <div className={"day" + (activeDay.weekday === day.weekday ? " active" : '')} onClick={() => handleActiveDay('weekday', day.weekday)} key={i}>
                      <span>{day.weekday}</span>
                      {(day.startTime && day.endTime)
                        ?
                        <span>{day.startTime} - {day.endTime}</span>
                        : <span> - </span>
                      }
                    </div>
                  )
                })}
              </div>
              <div className="time-wrapper">
                <div className="time-container">
                  <div className="start-time">
                    <span>De la ora: </span>
                    <input type="time" name="startTime" value={activeDay.startTime}
                           min="00:00" max="23:59" required onChange={(e) => handleActiveDay(e)} />
                  </div>
                  <div className="end-time">
                    <span>Pana la ora: </span>
                    <input type="time" name="endTime" value={activeDay.endTime}
                           min="00:00" max="23:59" required onChange={(e) => handleActiveDay(e)} />
                  </div>
                </div>
                <input className="button border-button" type="submit" value="Adauga" onClick={handleScheduleChange} />
              </div>
            </div>
          </div>

          <input className="button" type="submit" value="Salveaza profilul" />
        </form>
      </div>
    </div>
  )
}
export default ClinicProfile;
