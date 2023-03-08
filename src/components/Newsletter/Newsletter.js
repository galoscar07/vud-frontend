import React from 'react'
import "./Newsletter.scss"
import {API_MAP, getAPILink} from "../../utils/routes";
import {value} from "lodash/seq";

const Newsletter = (props) => {
  const [state, setState] = React.useState({
    email: {
      value: '',
      error: null,
    },
    name: {
      value: '',
      error: null,
    },
    areTermsChecked: {
      value: false,
      error: null
    },
    server: {
      error: null
    }
  })
  const [formValid, setFormValid] = React.useState(false)

  const isFormEmpty = () => {
    if (state.name.value && state.email.value) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: { ...state[event.target.name], value: event.target.value } })
    console.log(state)
    isFormEmpty()
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      getAPILink(API_MAP.POST_NEWSLETTER), {
        method: 'POST',
        body: JSON.stringify({
          email: state.email.value,
          name: state.name.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setState({
            email: {
              value: '',
              error: null,
            },
            name: {
              value: '',
              error: null,
            },
            areTermsChecked: {
              value: false,
              error: null
            },
            server: {
              error: null
            }
          })
        } else {
          setState({...state, server: {error: "Ceva a mers rau! Te rugam incearca mai tarziu"}})
        }
      })
  }
  return (
    <div className="newsletter-component">
      <div className="title">Newsletter</div>
      <img alt={'vreau un doctor'} src="/images/login.svg" />
      <form onSubmit={handleSubmit} autoComplete="off" className="newsletter-form">
        <label>Nume</label>
        <input className="full-width" type="text" name="name" value={state.name.value}
               onChange={handleChange} onBlur={isFormEmpty} />
        <label>Email</label>
        <input className="full-width" type="email" name="email" value={state.email.value}
               onChange={handleChange} onBlur={isFormEmpty} />
        <div className="checkbox-container">

          <label><span>Termeni si conditii de abonare</span></label>
          <div className="checkbox-wrapper">
            <input className="checkbox" type="checkbox" value={state.areTermsChecked.value}
                   onChange={handleChange} />
            <div>Sunt de acord</div>
          </div>

        </div>
        <input className={`button ${!formValid ? 'disabled' : ''}`} type="submit" value="Abonare" />
        {
          state.server.error &&
          <div className={'error'}>Ceva a mers rau! Va rugam incercati mai tarziu.</div>
        }
      </form>
    </div>
  );
}

export default Newsletter;
