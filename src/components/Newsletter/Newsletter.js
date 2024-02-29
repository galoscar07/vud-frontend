import React from 'react'
import "./Newsletter.scss"
import { API_MAP, getAPILink, routes } from "../../utils/routes";
import { value } from "lodash/seq";

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
    },
    isEnabled: true
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
          setState({ ...state, server: { error: "Ceva a mers rau! Te rugam incearca mai tarziu" } })
        }
      })
  }
  return (
    <React.Fragment>
      {state.isEnabled && 
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

            <label><a className="terms-hyper" href={routes.TERMS_AND_CONDITION} target={'_blank'} rel="noreferrer">Termeni si conditii de abonare</a></label>
            <div className="checkbox-wrapper">
              <input className="checkbox" type="checkbox" value={state.areTermsChecked.value}
                onChange={handleChange} />
              <div>Sunt de acord</div>
            </div>

          </div>
          <button className={`button border-button round ${!formValid ? 'disabled' : ''}`}>Abonare</button>
          {
            state.server.error &&
            <div className={'error'}>Ceva a mers rau! Va rugam incercati mai tarziu.</div>
          }
        </form>
      </div>}
    </React.Fragment>
  );
}

export default Newsletter;
