import React from 'react'
import "./DoctorCard.scss"
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const DoctorCard = (props) => {
  const navigate = useNavigate();


  const handleDoctorCardType = (type, doctor) => {

    switch (type) {
      case 1:
        return (
          <div className="doctor-card-component">
            <img className="profile" src={doctor.photo || "/images/user.svg"} />
            <a href={doctor.link}>
              <div className="text-container">
                <div className="title">{doctor.name}</div>
                <div className="academic-wrapper">
                  <div className="degree">{doctor.academic_degree.map((el) => el.label).join(', ')}</div>
                </div>
                <div className="specialties-wrapper">
                  <div className="spec">{doctor.speciality.map((el) => el.label).join(', ')}</div>
                </div>
                {doctor.link &&
                  <div className="location-wrapper">
                    <img src={"/images/icons/email.svg"} />
                    <div className="location">{doctor.link}</div>
                  </div>
                }
              </div>
            </a>
          </div>
        )

      case 2:
        return (
          <div className="doctor-card-component">
            <img className="profile" src={doctor.photo || "/images/user.svg"} />
            <div className="text-container2">
              <a href={doctor.link}>
                <div className="info" >
                  <div className="title">{doctor.first_name}</div>
                  <div className="title caps">{doctor.last_name}</div>
                  <div className="specialties-wrapper">
                    <div className="spec">{doctor.speciality.map((el) => el.label).join(', ')}</div>
                  </div>
                </div>
              </a>
              <div className="rating-container">
                {doctor.score > 0 && <div className="rating">
                  {Math.floor(doctor.score)}
                </div>}
                <div className="reviews">
                  {doctor.noOfReviews} recenzii
                </div>
                <div className="stars-wrapper ">
                  <div className="stars-container">
                    {Array(5).fill(1).map((el, i) =>
                      <img key={i} src={i >= doctor.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )

      case 3:
        return (
          <div onClick={() => navigate(routes.DOCTOR_PAGE + '/?id=' + doctor.id)} className="doctor-card-component" style={{ padding: '20px' }}>
            <div>
              <img className="profile" src={doctor.profile_picture || "/images/user.svg"} />
              <div className="rating-container" style={{ marginTop: '16px' }}>
                {doctor.score > 0 && <div className="rating">
                  {Math.floor(doctor.average_rating || 0)}
                </div>}
                <div className="reviews">
                  {doctor.review_count || 0} recenzii
                </div>
                <div className="stars-wrapper ">
                  <div className="stars-container">
                    {Array(5).fill(1).map((el, i) =>
                      <img key={i} src={i >= doctor.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-container2">
              <div className="info" >
                <div className="title">{doctor.first_name} {doctor.last_name}</div>
                <div className="title" style={{ fontSize: '20px', color: '#33435B', fontWeight: 400 }}>{doctor.speciality.map((el) => { return el.label }).join(" | ")}</div>
                <div className="specialties-wrapper">
                  <div className="spec" style={{ marginTop: "20px" }}>{doctor.medical_skill.map((el) => el.label).join(', ')}</div>
                </div>
                <div className="specialties-wrapper">
                  <div className="spec">{doctor.collaborator_clinic.map((el) => el.clinic_name).join(' | ')}</div>
                </div>
              </div>
            </div>
          </div >
        )
    }
  }


  return (
    <div className="doc-card">
      {handleDoctorCardType(props.type, props.doctor)}
    </div>
  )
}

export default DoctorCard;

