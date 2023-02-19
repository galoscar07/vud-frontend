import React from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./ClinicProfile.scss";
const ClinicProfile = () => {
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
  const [values, setValues] = React.useState({});
  const [schedule, setSchedule] = React.useState(days);
  const [activeDay, setActiveDay] = React.useState({ weekday: "Luni", startTime: "00:00", endTime: "00:00" });
  const [counterHQ, setCounterHQ] = React.useState(1);

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

  const handleFieldChange = (event) => {
    setValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    console.log(values);
    event.preventDefault();
  };

  const addAnotherInput = (name) => {
    console.log(name)
  }


  return (
    <div className="clinic-profile-page">
      <div className="data-container">
        <img alt={'Unitate medicala'} src="/images/unit.svg" />
        <h1>Profil</h1>
        <form onSubmit={handleSubmit}>
          <div className="contact-data">
            <div className="container-title">Date de contact profil</div>
            <div className="fields-wrapper">
              <div className="col">
                <div className="input-wrapper">
                  <label>*Denumirea unității medicale</label>
                  <input name="name" type="text" value={values.name}
                         onChange={(e) => {
                           handleFieldChange(e);
                         }} />
                </div>
              </div>
              <div className="col-3">
                <div className="input-wrapper">
                  <label>*Strada</label>
                  <input name="street" type="text" value={values.street}
                         onChange={(e) => {
                           handleFieldChange(e);
                         }} />
                </div>
                <div className="input-wrapper">
                  <label>Numarul strazii</label>
                  <input name="streetNo" type="text" value={values.streetNo}
                         onChange={(e) => {
                           handleFieldChange(e);
                         }} />
                </div>
              </div>
              <div className="col-3">
                <div className="input-wrapper">
                  <label>*Oras</label>
                  <select id="city" name="city">
                    <option value="Alba-Iulia">Alba-Iulia</option>
                    <option value="Cluj-Napoca">Cluj-Napoca</option>
                    <option value="Bucuresti">Bucuresti</option>
                    <option value="Sibiu">Sibiu</option>
                  </select>
                </div>
                <div className="input-wrapper">
                  <label>Judet</label>
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
                  <input name="other" type="text" value={values.other}
                         onChange={(e) => {
                           handleFieldChange(e);
                         }} />
                </div>
              </div>
            </div>
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
                <input name="callCenter" type="text" value={values.callCenter}
                       onChange={(e) => {
                         handleFieldChange(e);
                       }} />
                <div className="add-another" onClick={(e) => addAnotherInput(e.target.name)}>
                  <img alt={'adauga inca un numar'} src="/images/add.svg" />
                  <span>Adauga inca un numar</span>
                </div>
              </div>
              <div className="field-container">
                <label>*Email</label>
                <input name="email" type="text" value={values.email}
                       onChange={(e) => {
                         handleFieldChange(e.target.value, e.target.name);
                       }} />
                <div className="add-another" onClick={(e) => addAnotherInput(e.target.name)}>
                  <img alt={'adauga inca un email'} src="/images/add.svg" />
                  <span>Adauga inca un email</span>
                </div>
              </div>
            </div>
            {/* <div className="fields-wrapper">
                            <div className="col">
                                <div className="input-wrapper">
                                    <label>Adresa website</label>
                                    <input name="website" type="text" value={values.website}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }} />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="input-wrapper">
                                    <label>Profil Facebook</label>
                                    <input name="facebook" type="text" value={values.facebook}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Google</label>
                                    <input name="google" type="text" value={values.google}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Linkedin</label>
                                    <input name="linkedin" type="text" value={values.linkedin}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Youtube</label>
                                    <input name="youtube" type="text" value={values.youtube}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }} />
                                </div>
                            </div>
                        </div> */}
          </div>
          <div className="specialities-container">
            <div className="container-title">Specialitati</div>
            <Dropdown />
          </div>
          <div className="facilities-container">
            <div className="container-title">Facilitati unitate</div>
            <Dropdown />
          </div>

          <div className="hq-container">
            <div className="fields-wrapper">
              <div className="add-another" onClick={(e) => handleHQInputs()}>
                <img alt="adauga inca un sediu" src="/images/add.svg" />
                <span>Adauga inca un sediu</span>
              </div>
              {Array.from(Array(counterHQ)).map((el, i) => {
                return (
                  <>
                    <div className="col">
                      <div className="input-wrapper">
                        <label>*Denumirea unitatii medicale </label>
                        <input name={"name" + i} type="text" value={values.website}
                               onChange={(e) => {
                                 handleFieldChange(e);
                               }} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="input-wrapper">
                        <label>Link pagina </label>
                        <input name={"link" + i} type="text" value={values.website}
                               onChange={(e) => {
                                 handleFieldChange(e);
                               }} />
                      </div>
                    </div>
                    {/* Incarca poza profil??? */}
                  </>
                )
              })}
              <input className="button border-button" type="submit" value="Salveaza" />
            </div>
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
