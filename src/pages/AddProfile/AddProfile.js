import React ,{useEffect} from 'react'
import "./AddProfile.scss"
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AddProfile = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: 'images/doctor.svg',
      title: 'Medic',
      alt: 'imagine medic',
      disabled: false,
      isClinic: false,
      isDoctor: true,
    },
    {
      icon: 'images/unit.svg',
      title: 'Unitate medicală',
      alt: 'imagine unitate medicala',
      disabled: false,
      isClinic: true,
      isDoctor: false,
    }
  ]

  const handleClick = (card) => {
    makeRequestLogged(
      getAPILink(API_MAP.UPDATE_USER_PROFILE),
      'POST',
      JSON.stringify({
        is_clinic: card.isClinic,
        is_doctor: card.isDoctor,
      }),
      getAuthTokenFromLocal()
    )
      .then((response) => response.json())
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify({ is_visible: false, step: '2' }))
        if (resp.error !== 'Something went wrong') {
          if (resp.is_doctor) {
            navigate(routes.DOCTOR_DATA)
          } else if (resp.is_clinic) {
            navigate(routes.ADMIN_DATA)
          } else {
            navigate(routes.LOGIN)
          }
        } else {
          navigate(routes.LOGIN)
        }
      })
      .catch((err) => {

      })
  }

  return (
    <div className="add-profile-page">
      <h1>Adaugă pagină de profil pentru:</h1>
      <div className="profiles-container">
        {cards.map((card, i) =>
          <div className="profile-card" key={i}>
            <img alt={card.alt} src={card.icon} />
            <span>{card.title}</span>
            <div onClick={() => handleClick(card)} className={`button round border-button ${card.disabled && 'disabled'}`}>Adaugă</div>
          </div>)}
      </div>
    </div>
  );
}

export default AddProfile;
