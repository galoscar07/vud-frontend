import React, {useEffect, useState} from 'react'
import "./Homepage.scss"
import Select, { components } from "react-select";
import ClinicFilterContainer from '../../components/ClinicFilterContainer/ClinicFilterContainer';
import Newsletter from '../../components/Newsletter/Newsletter';
import AdSense from 'react-adsense';
import {API_MAP, getAPILink, routes} from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {useNavigate} from "react-router-dom";

const tags = [
  {
    title: "Te simti obosit?",
    icon: "heart",
    text: "Cauta un medic cardiolog",
    redirectLink: ""
  },
  {
    title: "Ai o urgenta?",
    icon: "ambulance",
    text: "Cauta o ambulanta",
    redirectLink: ""
  },
  {
    title: "Vrei o analiza??",
    icon: "needle",
    text: "Cauta un laborator de analize",
    redirectLink: ""
  },
  {
    title: "Vrei o consultatie??",
    icon: "consult",
    text: "Cauta un medic specialist",
    redirectLink: ""
  },
]

const options = [
  { value: 'clinica', label: 'Clinica' },
  // { value: 'doctor', label: 'Doctor' },
  // { value: 'specializare', label: 'Specializare' }
];


function Homepage() {
  const [selectedOption, setSelected] = React.useState([]);
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState('')
  const [topClinics, setTopClinics] = useState([])
  const navigate = useNavigate();

  const mapServerRespToFront = (listOfClinics) => {
    return listOfClinics.map((clinic) => {
      return {
        id: clinic.id,
        name: clinic.clinic_name,
        image: clinic.profile_picture,
        score: 8.4, // TODO
        noOfReviews: 641, // TODO
        rating: 4, // TODO
        specialty: clinic.clinic_specialities.map((cs) => {return cs.label}).join(", "),
        type: clinic.medical_unit_types.map((mut) => {return mut.label}).join(", "),
        contact: [
          { type: 'phoneNo', value: clinic.primary_phone },
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
    fetch(
      getAPILink(API_MAP.GET_TOP_CLINICS), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setTopClinics(mapServerRespToFront(res))
      })
  }, [])

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

  const showAll = () => { }
  const handleSearch = () => {
    navigate(`${routes.FILTER_PAGE}?searchTerm=${state}`)
  }

  return (
    <div className="home-page">
      <div className="main-title">
        Cauti  <div className="dropdown">
          <select name="searching" id="searching" onChange={(e) => handleChange(e.target.value)}>
            <option value="clinica">Clinica</option>
            {/*<option value="doctor">Doctor</option>*/}
            {/*<option value="specialitate">Specialitate</option>*/}
          </select>
        </div> pentru tine ?
      </div>
      <h1>GOOGLE DDS</h1>
      <AdSense.Google
        client='ca-pub-1837999521110876'
        slot='f08c47fec0942fa0'
      />
      <form onSubmit={(ev) => {ev.preventDefault()}} className="searchbar">
        <input value={state} onChange={(ev) => setState(ev.target.value)} className="search" type="text" placeholder="Cauta" name="search" />
        <button className="button border-button" onClick={handleSearch}>Cauta</button>
      </form>
      <div className="tags-wrapper">
        {tags.map((tag, i) =>
          <div className="tag-container" key={i}>
            <img key={i} alt={tag.icon} src={`/images/icons/${tag.icon}.svg`} />
            <div className="text-wrapper">
              <span className="title">{tag.title}</span>
              <span className="redirect">{tag.text}</span>
            </div>
          </div>)}
      </div>

      <div className="content">
        <div className="main-content">
          <div className="container-title">
            <div className="title">
              <img src="/images/star_full.svg" />
              Top unitati medicale
            </div>
            <div className="subtitle" onClick={showAll}>
              Toate unitatile
            </div>
          </div>
          <div className="results-container">
            {
              loading
                ? <LoadingSpinner />
                : topClinics.map((clinic, i) =>
                    <ClinicFilterContainer displayReviews key={i} clinic={clinic} />
                  )
            }
          </div>
        </div>

        <div className="side-content">
          <Newsletter />
        </div>
      </div>

    </div>
  );
}

export default Homepage;
