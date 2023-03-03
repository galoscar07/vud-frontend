import React from 'react'
import "./Homepage.scss"
import Select, { components } from "react-select";
import ClinicFilterContainer from '../../components/ClinicFilterContainer/ClinicFilterContainer';
import Newsletter from '../../components/Newsletter/Newsletter';

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
  return (
    <div className="home-page">
      <h1>
        Cauti clinici pentru tine ?
      </h1>
      <div className="dropdown">
        {/* <Select classNamePrefix='drop' 
        defaultValue="clinica"
          value={selectedOption}
          onChange={handleChange}
          options={options}
        /> */}
      </div>
      <form className="searchbar">
        <input className="search" type="text" placeholder="Cauta" name="search" />
        <button className=" border-button" type="submit">Cauta</button>
      </form>
      <div className="tags-wrapper">
        {tags.map((tag, i) =>
          <div className="tag-container">
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
            <div className="subtitle">
              Toate unitatile
            </div>
          </div>
          <div className="results-container">
            {clinics.map((clinic, i) =>
              <ClinicFilterContainer clinic={clinic} />
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
