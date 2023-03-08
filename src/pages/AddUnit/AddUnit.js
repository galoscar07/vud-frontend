import React, {useEffect, useState} from 'react'
import "./AddUnit.scss"
import Dropdown from '../../components/Dropdown/Dropdown';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../utils/routes";
import {getAuthTokenFromLocal} from "../../utils/localStorage";
import {useNavigate} from "react-router-dom";


const AddUnit = () => {
  const [state, setState] = useState({
    loading: true,
    dropdownValues: [],
    selected: [],
    error: false
  })
  const navigate = useNavigate();

  const onSelect = (elems) => {
    setState({...state, selected: elems})
  }

  useEffect(() => {
    fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => {return {value: el.id, label: el.label}})
        setState({...state, loading: false, dropdownValues: mapped})
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (state.selected.length === 0) {
      setState({...state, error: true})
    } else {
      const listOfIds = state.selected.map((el) => {return el.value})
      makeRequestLogged(
        getAPILink(API_MAP.PUT_MEDICAL_TYPES),
        'PUT',
        JSON.stringify({list_of_clinic_types: listOfIds}),
        getAuthTokenFromLocal()
      )
        .then((response) => response.json())
        .then((resp) => {
          if (resp.success === 'Success') {
            navigate(routes.PROFILE)
          } else {
            // TODO Hamburger error raise error
          }
        })
        .catch((err) => {
          // TODO Hamburger error raise error
        })
    }
  }

  const renderPage = () => {
    return (
      <React.Fragment>
        <form onSubmit={onSubmit}>
          <img alt={'imagine unitate medicala'} src="/images/unit.svg"/>
          <h1>Adaugă Unitate medicală</h1>
          <Dropdown onSelect={onSelect} options={state.dropdownValues} title={"Cauta tip unitate"}></Dropdown>
          {
            state.error && <div className={'error'}>Trebuie selectata minim o optiune</div>
          }
          <input className="button round" type="submit" value="Mergi mai depart"/>
        </form>
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
