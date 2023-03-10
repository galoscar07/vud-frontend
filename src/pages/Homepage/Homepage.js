import React from 'react'
import "./Homepage.scss"
import Select, { components } from "react-select";
import ClinicFilterContainer from '../../components/ClinicFilterContainer/ClinicFilterContainer';
import Newsletter from '../../components/Newsletter/Newsletter';
import AdSense from 'react-adsense';

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
  { value: 'doctor', label: 'Doctor' },
  { value: 'specializare', label: 'Specializare' }
];

const clinics = [
  {
    name: "Ponderas Academic Hospital",
    image: 'https://www.shutterstock.com/shutterstock/photos/212251981/display_1500/stock-photo-modern-hospital-style-building-212251981.jpg',
    score: 8.4,
    noOfReviews: 641,
    rating: 4,
    specialty: "Chirurgie medicala si bariatrica",
    type: "Spital Privat",
    contact: [{ type: 'phoneNo', value: "004 - 1721 722 763" }, { type: "location", value: "Cluj-Napoca" }],
    reviews: [
      {
        name: "Cristina Moise",
        rating: 5,
        text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!"
      },
      {
        name: "Radu G.",
        rating: 5,
        text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!"
      },
    ]
  },
  {
    name: "Regina Maria",
    image: "",
    score: 8.4,
    noOfReviews: 641,
    rating: 4,
    specialty: "Chirurgie medicala si bariatrica",
    type: "Spital Privat",
    contact: [{ type: 'phoneNo', value: "004 - 1721 722 763" }, { type: "location", value: "Cluj-Napoca" }],
    reviews: [
      {
        name: "Cristina Moise",
        rating: 5,
        text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!"
      },
      {
        name: "Radu G.",
        rating: 5,
        text: "Demonstreaza ca inca mai exista doctori care stiu aceasta meserie la perfectie! M-a ajutat foarte mult!"
      },
    ]
  }
]

function Homepage() {
  const [selectedOption, setSelected] = React.useState([]);
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }
  const showAll = () => { }
  const handleSearch = () => { }
  return (
    <div className="home-page">
      <div className="main-title">
        Cauti  <div className="dropdown">
          <select name="searching" id="searching" onChange={(e) => handleChange(e.target.value)}>
            <option value="clinica">Clinica</option>
            <option value="doctor">Doctor</option>
            <option value="specialitate">Specialitate</option>
          </select>
        </div> pentru tine ?
      </div>
      <AdSense.Google
        client='ca-pub-7292810486004926'
        slot='7806394673'
      />
      <form className="searchbar">
        <input className="search" type="text" placeholder="Cauta" name="search" />
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
            {clinics.map((clinic, i) =>
              <ClinicFilterContainer displayReviews key={i} clinic={clinic} />
            )}
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
