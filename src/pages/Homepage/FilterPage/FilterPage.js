import React from 'react'
import "./FilterPage.scss"
import Dropdown from '../../../components/Dropdown/Dropdown';
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

                </div>
                <div className="right-side">

                </div>
            </div >

        </div >
    );
}

export default FilterPage;
