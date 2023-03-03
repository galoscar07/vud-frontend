import React, {useEffect, useState} from 'react'
import "./AddUnit.scss"
import Dropdown from '../../components/Dropdown/Dropdown';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AddUnit = () => {

  const [state, setState] = useState({
    loading: true,
  })

  useEffect(() => {

  }, [])

  const renderPage = () => {
    return (
      <React.Fragment>
        <img alt={'imagine unitate medicala'} src="/images/unit.svg"/>
        <h1>Adaugă Unitate medicală</h1>
        <Dropdown></Dropdown>
        <input className="button" type="submit" value="Mergi mai depart"/>
      </React.Fragment>
    )
  }

  return (
    <div className="add-unit-page">
      {
        state.loading
          ? <LoadingSpinner />
          : renderPage()
      }
    </div>
  );
}

export default AddUnit;
