import React, {useCallback, useEffect} from 'react'
import "./Register.scss"
import _ from 'lodash';
import {API_MAP, getAPILink, routes} from "../../../utils/routes";

const Register = () => {
  const [state, setState] = React.useState({
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
    confirmPassword: {
      value: '',
      error: null,
    },
    server: {
      error: null,
    }
  })
  const [link, setLink] = React.useState("");
  const [areTermsChecked, setTermsChecked] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false)

  const [step, setStep] = React.useState(0)

  const isFormEmpty = () => {
    if (state.password.value && state.confirmPassword.value && state.email.value && areTermsChecked) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }

  const isFormValid = () => {
    let stateCopy = _.cloneDeep(state)
    stateCopy.password.error = null
    stateCopy.confirmPassword.error = null
    stateCopy.email.error = null

    if (!state.password.value) {
      stateCopy.password.error = 'Acest camp nu poate fi gol'
    }
    if (!state.confirmPassword.value) {
      stateCopy.confirmPassword.error = 'Acest camp nu poate fi gol'
    }
    if (!state.email.value) {
      stateCopy.email.error = 'Acest camp nu poate fi gol'
    }
    if (!RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(state.email.value)) {
      stateCopy.email.error = 'Email-ul trebuie sa fie de forma aaa@bbb.ddd'
    }
    if (state.password.value.length <= 8) {
      stateCopy.password.error = 'Parola trebuie sa aiba cel putin 8 caractere'
    }
    if (state.confirmPassword.value.length <= 8) {
      stateCopy.confirmPassword.error = 'Parola trebuie sa aiba cel putin 8 caractere'
    }
    if (state.confirmPassword.value !== state.password.value) {
      stateCopy.confirmPassword.error = 'Parola trebuie sa coincida'
      stateCopy.password.error = 'Parola trebuie sa coincida'
    }
    if (!areTermsChecked) {
      stateCopy.server.error = 'Trebuie sa fi de acord cu termenii si conditiile'
    }

    if (JSON.stringify(stateCopy) !== JSON.stringify(state)) {
      setState(stateCopy)
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: { ...state[event.target.name], value: event.target.value } })
  }

  const handleTermsChecked = (event) => {
    setTermsChecked(!areTermsChecked);
  };

  useEffect(() => {
    isFormEmpty()
  }, [areTermsChecked, state])

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    if (!isFormValid()) {
      return
    }
    fetch(
      getAPILink(API_MAP.REGISTER), {
      method: 'POST',
      body: JSON.stringify({
        email: state.email.value,
        password: state.password.value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          throw Error
        }
        return response.json()
      })
      .then((data) => {
        setLink(data.link);
        setStep(1)
      })
      .catch((err) => {
        setState({ ...state, server: { error: "Ceva nu a funcționat. Vă rugăm să încercați în câteva minute" } })
      })
  });

  const handleSubmitResendEmail = () => {
    fetch(
      getAPILink(API_MAP.RESEND_REGISTER), {
      method: 'POST',
      body: JSON.stringify({
        email: state.email.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          throw Error
        }
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {})
  }

  return (
    <div className="register-page">
      <img alt={'vreau un doctor'} src="/images/login.svg" />
      <div className="auth-container">
        <h1>Înregistrare cont</h1>
        <form autoComplete="off">
          {step === 0 &&
            <React.Fragment>
              <label>Email</label>
              <input className={`full-width ${state.email.error && 'error'}`} type="email"
                name="email" value={state.email.value} onChange={handleChange} />
              {state.email.error &&
                <div className={'error'}>{state.email.error}</div>
              }
              <label>Password</label>
              <input className={`full-width ${state.password.error && 'error'}`} type="password"
                name="password" value={state.password.value} onChange={handleChange} />
              {state.password.error &&
                <div className={'error'}>{state.password.error}</div>
              }
              <label>Confirm password</label>
              <input className={`full-width ${state.confirmPassword.error && 'error'}`} type="password"
                name="confirmPassword" value={state.confirmPassword.value} onChange={handleChange} />
              {state.confirmPassword.error &&
                <div className={'error'}>{state.confirmPassword.error}</div>
              }
              <div className="checkbox-container">
                <div>
                  <input className="checkbox" type="checkbox" value={areTermsChecked}
                    onChange={handleTermsChecked} />
                  <label>Sunt de acord cu <a className="terms-hyper" href={routes.TERMS_AND_CONDITION} target={'_blank'}>termenii si conditiile</a></label>
                </div>
              </div>
              {state.server.error &&
                <div className={'error'}>{state.server.error}</div>
              }

              <button
                className={`button custom-width round ${!formValid ? 'disabled' : ''}`}
                onClick={handleSubmit}
                disabled={!formValid}
              >Inregistrare</button>

            </React.Fragment>
          }
          {step === 1 &&
            <React.Fragment>
              <span>
                Ti-am trimis un link in vederea conectarii pe email, te rugam sa accesezi link-ul pentru a termina procesul de autentificare.
                In cazul in care nu ai primit email-ul da click
                <span onClick={handleSubmitResendEmail} className="code-label click"> aici </span>
              </span>
            </React.Fragment>
          }
        </form>
      </div>
    </div>
  );
}


export default Register;
