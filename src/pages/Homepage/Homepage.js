import React, { useEffect, useState } from 'react'
import "./Homepage.scss"
import Select, { components } from "react-select";
import ClinicFilterContainer from '../../components/ClinicFilterContainer/ClinicFilterContainer';
import Newsletter from '../../components/Newsletter/Newsletter';
import { API_MAP, API_URL_MEDIA, getAPILink, routes } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Adsense } from '@ctrl/react-adsense';

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
  const [banners, setBanners] = useState([])
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
        score: clinic?.average_rating * 2 || 0,
        noOfReviews: clinic?.review_count || 0,
        rating: clinic?.average_rating || 0,
        specialty: clinic.clinic_specialities.map((cs) => { return cs.label }).join(", "),
        type: clinic.medical_unit_types.map((mut) => { return mut.label }).join(", "),
        contact: [
          { type: 'phoneNo', value: JSON.parse(clinic.primary_phone).value },
          { type: "location", value: `Str. ${clinic?.clinic_street} ${clinic?.clinic_number ? 'nr.' + clinic?.clinic_number : ''}${clinic.clinic_town !== null ? ', ' + clinic.clinic_town : ''}`, },
          { type: "email", value: clinic?.primary_email }
        ],
        reviews: clinic.recent_reviews?.map((rev) => {
          return {
            name: rev.name,
            rating: rev.rating,
            text: rev.comment
          }
        }) || [],
      }
    }).sort((a, b) => (a.score < b.score) ? 1 : -1)
  }

  useEffect(() => {
    fetch(
      getAPILink(API_MAP.GET_BANNER_CARDS), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setBanners(res.map((re) => {
            return {
              title: re.title,
              icon: `${API_URL_MEDIA + re.profile_picture}`,
              text: re.subtitle,
              redirectLink: re.link
            }
          }))
        }
      })
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
  }

  const showAll = () => {
    navigate(`${routes.FILTER_PAGE}`)
  }
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
      <form onSubmit={(ev) => { ev.preventDefault() }} className="searchbar">
        <input value={state} onChange={(ev) => setState(ev.target.value)} className="search" type="text" placeholder="Cauta" name="search" />
        <button className="button border-button" onClick={handleSearch}>Cauta</button>
      </form>
      <div className="tags-wrapper">
        {banners.map((tag, i) =>
          <a className="tag-container"
            key={i} href={tag.redirectLink}>
            <img key={i} alt={tag.icon} src={`${tag.icon}`} />
            <div className="text-wrapper">
              <span className="title">{tag.title}</span>
              <span className="redirect">{tag.text}</span>
            </div>
          </a>)}
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
          <div className="ads-container">
            <img className="add" src="/images/ads/add7.svg" />
          </div>
        </div>

        <div className="side-content">
          <img className="add" src="/images/ads/add4.svg" />
          <img className="add" src="/images/ads/add5.svg" />
          <Newsletter />
          <img className="add" src="/images/ads/ad1.svg" />
        </div>
      </div>

      {/* <AdSense.Google
        client='ca-pub-1837999521110876'
        slot='f08c47fec0942fa0'
      /> */}
      <Adsense
        client="ca-pub-7640562161899788"
        slot="7259870550"
        style={{ width: 500, height: 300 }}
        format=""
      />

    </div>
  );
}

export default Homepage;
