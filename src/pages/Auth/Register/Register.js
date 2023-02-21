import React from 'react'
import "./register.scss"
import _ from 'lodash';
import {API_MAP, getAPILink} from "../../../utils/routes";

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

  const [areTermsChecked, setTermsChecked] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false)

  const [step, setStep] = React.useState(0)

  const isFormEmpty = () => {
    if (state.password.value && state.confirmPassword.value && state.email.value) {
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
    stateCopy.server.error = null

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

    if (JSON.stringify(stateCopy) !== JSON.stringify(state)) {
  
      console.log('BEFORE', stateCopy, state)
      setState(stateCopy)
      const ret = Object.keys(stateCopy).every((x) => !stateCopy[x].error);
      console.log(ret, 'AFTER', stateCopy, state);
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setState({...state, [event.target.name]: {...state[event.target.name], value: event.target.value}})
    isFormEmpty()
  }

  const handleTermsChecked = (event) => {
    setTermsChecked(!areTermsChecked);
  };

  const handleSubmit = (event) => {
    // TODO Problem when submitted once and then submit again you have to click the button twice
    event.preventDefault();
    if (!isFormValid() || !formValid) {
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
        setStep(1)
      })
      .catch((err) => {
        setState({...state, server: {error: "Ceva a mers prost. Va rugam incercati mai tarziu"}})
      })
  };

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
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="register-page">
      <img alt={'vreau un doctor'} src="/images/login.svg" />
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          {step === 0 &&
            <React.Fragment>
              <label>Email</label>
              <input className={`full-width ${state.email.error && 'error'}`} type="email"
                     name="email" value={state.email.value} onChange={handleChange}
                     onBlur={isFormEmpty} />
              { state.email.error &&
                <div className={'error'}>{state.email.error}</div>
              }
              <label>Password</label>
              <input className={`full-width ${state.password.error && 'error'}`} type="password"
                     name="password" value={state.password.value} onChange={handleChange}
                     onBlur={isFormEmpty} />
              { state.password.error &&
                <div className={'error'}>{state.password.error}</div>
              }
              <label>Confirm password</label>
              <input className={`full-width ${state.confirmPassword.error && 'error'}`} type="password"
                     name="confirmPassword" value={state.confirmPassword.value} onChange={handleChange}
                     onBlur={isFormEmpty} />
              { state.confirmPassword.error &&
                <div className={'error'}>{state.confirmPassword.error}</div>
              }
              <div className="checkbox-container">
                <div>
                  <input className="checkbox" type="checkbox" value={areTermsChecked}
                         onChange={handleTermsChecked} />
                  <label>Sunt de acord cu <span>termenii si conditiile</span></label>
                </div>
              </div>
              { state.server.error &&
                <div className={'error'}>{state.server.error}</div>
              }
              <input className={`button ${!areTermsChecked || !formValid ? 'disabled' : ''}`}
                     type="submit" value="Register" />
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
