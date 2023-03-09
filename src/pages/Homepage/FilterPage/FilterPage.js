import React from 'react'
import "./FilterPage.scss"
import Dropdown from '../../../components/Dropdown/Dropdown';
import ClinicFilterContainer from '../../../components/ClinicFilterContainer/ClinicFilterContainer';

const options = [
    { value: 'clinica', label: 'Clinica' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'specializare', label: 'Specializare' }
];
const FilterPage = (props) => {
    const [selectedOption, setSelected] = React.useState([]);
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        console.log(`Option selected:`, selectedOption);
    }
    const handleSearch = () => { }
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
    return (
        <div className="filter-page">
            <div className="filter-main-content">
                <div className="left-side">
                    <div className="search-container">
                        <div className="dropdown">
                            <form className="searchbar">
                                <div className="upper-container">
                                    <input className="search" type="text" placeholder="Cauta" name="search" />
                                    <select name="searching" id="searching" onChange={(e) => handleChange(e.target.value)}>
                                        <option value="clinica">Clinica</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="specialitate">Specialitate</option>
                                    </select>
                                </div>
                                <button className="button" onClick={handleSearch}>Cauta</button>
                            </form>
                        </div>
                    </div>
                    <Dropdown options={options} title={"Oras"} />
                    <Dropdown options={options} title={"Oras"} />
                    <Dropdown options={options} title={"Oras"} />

                </div>
                <div className="center-side">
                    <div className="results-container">
                        {clinics.map((clinic, i) =>
                            <ClinicFilterContainer key={i} clinic={clinic} />
                        )}
                    </div>
                </div>
                <div className="right-side">
                    <iframe
                        title={'google maps'}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                        width="100%"
                        height="810"
                        frameBorder="0"
                        style={{ border: 0, marginTop: 15 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </div>
            </div >

        </div >
    );
}

export default FilterPage;
