import React from 'react'
import "./AddUnit.scss"
import Dropdown from '../../components/Dropdown/Dropdown';

const AddUnit = () => {

    return (
        <div className="add-unit-page">
            <img src="/images/unit.svg"/>
            <h1>Adaugă Unitate medicală</h1>
           <Dropdown></Dropdown>
           <input className="button" type="submit" value="Mergi mai depart"/>
        </div>
    );
}

export default AddUnit;
