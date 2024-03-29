import React, { useEffect, useState } from 'react'
import "./AddUnit.scss"
import Dropdown from '../../components/Dropdown/Dropdown';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";


const AddUnit = (props) => {
  useEffect(() => {
    if (props.selected !== state.selected) {
      setState({...state, selected: props.selected})
    }
  }, [props])

  const [state, setState] = useState({
    loading: true,
    dropdownValues: [],
    selected: props?.selected || [],
    error: ''
  })
  const navigate = useNavigate();

  const onSelect = (elems) => {
      setState({ ...state, selected: elems })
  }

  useEffect(() => {
    fetch(getAPILink(API_MAP.GET_MEDICAL_UNITY_TYPE), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((resp) => resp.json())
      .then((response) => {
        const mapped = response.map((el) => { return { value: el.id, label: el.label } })
        setState({ ...state, loading: false, dropdownValues: mapped })
      })
      .catch((err) => {})
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (props.onSubmit) {
      props.onSubmit(state.selected)
    }
    else {
      if (state.selected.length === 0) {
        setState({ ...state, error: "Trebuie selectata o optiune" })
      } else {
        const listOfIds = [state.selected.value]
        makeRequestLogged(
          getAPILink(API_MAP.PUT_MEDICAL_TYPES),
          'PUT',
          JSON.stringify({ list_of_clinic_types: listOfIds }),
          getAuthTokenFromLocal()
        )
          .then((response) => response.json())
          .then((resp) => {
            if (resp.success === 'Success') {
              localStorage.setItem('user', JSON.stringify({is_visible: false, step: '4'}))
              navigate(routes.PROFILE)
            } else {
              setState({ ...state, error: "Ceva nu a funcționat. Vă rugăm să încercați în câteva minute" })
            }
          })
          .catch((err) => {
            setState({ ...state, error: "Ceva nu a funcționat. Vă rugăm să încercați în câteva minute" })
          })
      }
    }
  }

  console.log(state)

  const renderPage = () => {
    return (
      <React.Fragment>
        <form>
          <img alt={'imagine unitate medicala'} src="/images/unit.svg" />
          <h1>Adaugă Unitate medicală</h1>
          <Dropdown noNumber selected={props?.selected || state.selected} onSelect={onSelect} options={state.dropdownValues} title={"Caută tip unitate"} ></Dropdown>
          {
            state.error && <div className={'error'}>{state.error}</div>
          }
          <button className="button round" onClick={onSubmit}> {props.selected ? 'Salveaza' : 'Mergi mai departe'}</button>
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
