import React, {useEffect, useState} from 'react'
import "./Homepage.scss"
import ClinicFilterContainer from '../../components/ClinicFilterContainer/ClinicFilterContainer';
import Newsletter from '../../components/Newsletter/Newsletter';
import {API_MAP, API_URL_MEDIA, getAPILink, routes} from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {useNavigate} from "react-router-dom";
import {Adsense} from '@ctrl/react-adsense';
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import DoctorFilterContainer from "../../components/DoctorFilterContainer/DoctorFilterContainer";

const label_ads = [
  'homepage_1', 'homepage_2', 'homepage_3', 'homepage_4'
]

const default_adds = {
  'homepage_1': {
    id: 1,
    href: 'www.google.com',
    alt: 'add-1',
    photo: "/images/ads/add7.svg",
    size: '437x437',
  },
  'homepage_2': {
    id: 2,
    href: 'www.google.com',
    alt: 'add-2',
    photo: "/images/ads/add4.svg",
    size: '211x882'
  },
  'homepage_3': {
    id: 3,
    href: 'www.google.com',
    alt: 'add-3',
    photo: "/images/ads/add5.svg",
    size: '154x224'
  },
  'homepage_4': {
    id: 4,
    href: 'www.google.com',
    alt: 'add-4',
    photo: "/images/ads/ad1.svg",
    size: '224x224'
  },

}

const options = [
  {value: 'clinica', label: 'Clinica'},
  {value: 'doctor', label: 'Doctor'},
  // { value: 'specializare', label: 'Specializare' }
];


function Homepage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const [banners, setBanners] = useState([])
  const [addsToDisplay, setAddsToDisplay] = useState({})

  // Search
  const [state, setState] = useState('')
  const [selectedOption, setSelected] = useState('clinic');
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  }
  const showAll = () => {
    navigate(`${routes.FILTER_PAGE}?search_type=${selectedOption}&search_term=`)
  }
  const showAllDoctors = () => {
    navigate(`${routes.FILTER_PAGE}?search_type=doctor&search_term=`)
  }
  const handleSearch = () => {
    navigate(`${routes.FILTER_PAGE}?search_term=${state}&search_type=${selectedOption}`)
  }

  // Top clinics
  const [topClinics, setTopClinics] = useState([])
  const [topDoctors, setTopDoctors] = useState([])
  const mapServerRespToFrontDoctors = (doctors) => {
    // return doctors.map( res => {
    //   return {
    //     id: res.id,
    //     name: res.first_name + " " + res.last_name,
    //     imageUrl: res.profile_picture || "/images/user.svg",
    //     score: res.average_rating * 2 || 0,
    //     noOfReviews: res.review_count || 0,
    //     rating: res.average_rating || 0,
    //     links: [
    //       { type: "Facebook", value: res.website_facebook },
    //       { type: "Linkedin", value: res.website_linkedin },
    //       { type: "Youtube", value: res.website_youtube },
    //       { type: "Google", value: res.website_google },
    //       { type: "Whatsapp", value: res.whatsapp },
    //     ],
    //     contact: [
    //       { type: 'Telefon', value: res.primary_phone, icon: "phone" },
    //       { type: "email", value: res.primary_email, icon: "email" },
    //       { type: "website", value: res.website, icon: "website" },
    //     ],
    //     testimonials: res.reviews?.map((el) => { return { text: el.comment } }).slice(0, 4) || [],
    //     reviews: res.reviews?.map((el) => {
    //       return {
    //         name: el.name,
    //         rating: el.rating,
    //         text: el.comment
    //       }
    //     }) || [],
    //     about: res.description,
    //     competences: res.medical_skill?.map((el) => { return el.label }) || [],
    //     specialities: res.speciality?.map((el) => { return el.label }) || [],
    //     degrees: res.academic_degree?.map((el) => { return el.label }) || [],
    //     collaborator_doctors: res.collaborator_doctor?.map((doc) => {
    //       return {
    //         link: "/doctor-page/?id=" + doc.id,
    //         first_name: doc.first_name,
    //         last_name: doc.last_name,
    //         photo: doc.profile_picture || null,
    //         speciality: doc.speciality || [],
    //         rating: doc.average_rating || 0,
    //         noOfReviews: doc.review_count || 0,
    //         score: doc.average_rating * 2 || 0,
    //
    //       }
    //     }),
    //     collaborator_clinics: res.collaborator_clinic?.map((clinic) => {
    //       return {
    //         link: "/clinic-page/?id=" + clinic.id,
    //         name: clinic.clinic_name,
    //         photo: clinic.profile_picture,
    //         address:
    //             (clinic?.clinic_street ? clinic.clinic_street + " " : "") +
    //             (clinic?.clinic_number ? clinic.clinic_number + " " : "") +
    //             (clinic?.clinic_other_details ? clinic.clinic_other_details + " " : "") +
    //             (clinic?.clinic_town ? clinic.clinic_town + " " : "") +
    //             (clinic?.clinic_county ? clinic.clinic_county : ""),
    //         medical_unit_type: clinic.medical_unit_types?.map((el) => { return el.label }) || [],
    //         phone: clinic.primary_phone,
    //       }
    //     })
    //   }
    // })
    return doctors
  }

  const mapServerRespToFront = (listOfClinics) => {
    return listOfClinics.map((clinic) => {
      return {
        id: clinic.id,
        name: clinic.clinic_name,
        image: clinic.profile_picture,
        score: clinic?.average_rating * 2 || 0,
        noOfReviews: clinic?.review_count || 0,
        rating: clinic?.average_rating || 0,
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
          {type: "email", value: clinic?.primary_email}
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

  // Component did mount
  useEffect(() => {
      window.scrollTo(0, 0)

      // Adds
      const jsonArray = JSON.parse(localStorage.getItem('ads') || '[]');
      const filteredAds = jsonArray.filter(item => item.location.includes('homepage'));
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

      // Get banners
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

      // Get top clinics
      fetch(getAPILink(API_MAP.GET_TOP_CLINICS), {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
        .then((res) => res.json())
        .then((res) => {
          setTopClinics(mapServerRespToFront(res))
        })
      fetch(getAPILink(API_MAP.GET_TOP_DOCTORS), {
              method: 'GET',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
            })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          setTopDoctors(mapServerRespToFrontDoctors(res))
        })
    }
    , [])

  return (
    <div className="home-page">
      <div className="main-title">
        Cauți
          <div className="dropdown">
            <select value={selectedOption} name="searching" id="searching" onChange={(e) => handleChange(e.target.value)}>
              <option value="clinic">Clinică</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        pentru tine ?
      </div>
      <form
        onSubmit={(ev) => { ev.preventDefault() }} className="searchbar"
      >
        <input value={state} onChange={(ev) => setState(ev.target.value)} className="search" type="text"
               placeholder="Caută" name="search" />
        <button className="button border-button" onClick={handleSearch}>Caută</button>
      </form>
      <div className="tags-wrapper">
        {banners.map((tag, i) =>
          <a className="tag-container"
             key={i} href={tag.redirectLink}>
            <img key={i} alt={tag.icon} src={`${tag.icon}`}/>
            <div className="text-wrapper">
              <span className="title">{tag.title}</span>
              <span className="redirect">{tag.text}</span>
            </div>
          </a>)}
      </div>

      <div className="content">
        <div className="main-content">
          {
            topDoctors.length > 0 &&
              <React.Fragment>
                <div className="container-title desktop">
                  <div className="title">
                    <img src="/images/star_full.svg" alt={"stea"}/>
                    Top medici
                  </div>
                  <div className="subtitle" onClick={showAllDoctors}>
                    Toati medicii
                  </div>
                </div>
                <div className="results-container">
                  {
                    loading
                        ? <LoadingSpinner/>
                        : topDoctors.map((doctor, i) =>
                            <DoctorFilterContainer displayReviews key={i} doctor={doctor} type={1}/>
                        )
                  }
                </div>
              </React.Fragment>
          }
          <div className="container-title desktop">
            <div className="title">
              <img src="/images/star_full.svg" alt={"stea"}/>
              Top unitati medicale
            </div>
            <div className="subtitle" onClick={showAll}>
              Toate unitatile
            </div>
          </div>
          <div className="results-container">
            {
              loading
                ? <LoadingSpinner/>
                : topClinics.map((clinic, i) =>
                  <ClinicFilterContainer displayReviews key={i} clinic={clinic}/>
                )
            }
          </div>
          <div className="ads-container">
            <img className="add"
              //  style={{height: addsToDisplay['homepage_1']?.size.split("x")[0]+'px', width: addsToDisplay['homepage_1']?.size.split("x")[1]+'px'}}
                 src={addsToDisplay['homepage_1']?.photo}/>
          </div>
        </div>

        <div className="side-content">
          <img className="add"
            //  style={{height: addsToDisplay['homepage_2']?.size.split("x")[0]+'px', width: addsToDisplay['homepage_2']?.size.split("x")[1]+'px'}}
               src={addsToDisplay['homepage_2']?.photo}/>
          <img className="add"
            // style={{height: addsToDisplay['homepage_3']?.size.split("x")[0]+'px', width: addsToDisplay['homepage_3']?.size.split("x")[1]+'px'}}
               src={addsToDisplay['homepage_3']?.photo}/>
          <Newsletter/>
          <img className="add"
            // style={{height: addsToDisplay['homepage_4']?.size.split("x")[0]+'px', width: addsToDisplay['homepage_4']?.size.split("x")[1]+'px'}}
               src={addsToDisplay['homepage_4']?.photo}/>
        </div>
      </div>

      {/* <AdSense.Google
        client='ca-pub-1837999521110876'
        slot='f08c47fec0942fa0'
      /> */}
      <Adsense
        client="ca-pub-7640562161899788"
        slot="7259870550"
        style={{width: 500, height: 300}}
        format=""
      />

    </div>
  );
}

export default Homepage;
