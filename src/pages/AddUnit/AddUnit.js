import React from 'react'
import "./AddUnit.scss"
import Dropdown from '../../components/Dropdown/Dropdown';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'bannana', label: 'Bannana' },
]
const AddUnit = () => {

    return (
        <div className="add-unit-page">
            <img alt={'imagine unitate medicala'} src="/images/unit.svg" />
            <h1>Adaugă Unitate medicală</h1>
            <Dropdown options={options} title={"Cauta tip unitate"}></Dropdown>
            <input className="button" type="submit" value="Mergi mai depart" />
        </div>
    );
}

export default AddUnit;
