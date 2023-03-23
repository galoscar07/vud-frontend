import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {API_MAP, AUTH_CLINIC_MAP_STEP, getAPILink, makeRequestLogged, routes} from "../../../utils/routes";
import "./Login.scss"
import _ from "lodash";
import {setAuthParamsToLocal, setUserToLocal} from "../../../utils/localStorage";

const Login = () => {

  const [state, setState] = React.useState({
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
    server: {
      error: null
    }
  })

  const navigate = useNavigate();


  const [formValid, setFormValid] = React.useState(false)
  const isFormEmpty = () => {
    if (state.password.value && state.email.value) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: { ...state[event.target.name], value: event.target.value } })
    isFormEmpty()
  }

  const isFormValid = () => {
    let stateCopy = _.cloneDeep(state)
    stateCopy.password.error = null
    stateCopy.email.error = null
    stateCopy.server.error = null

    if (!state.password.value) {
      stateCopy.password.error = 'Acest camp nu poate fi gol'
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
    if (JSON.stringify(stateCopy) !== JSON.stringify(state)) {
      setState(stateCopy)
      return false
    }
    return true
  }


  const handleSubmit = useCallback(event => {
    event.preventDefault();
    // if (!isFormValid()) {
    //   console.log('invalid')
    //   return
    // }
    fetch(
      getAPILink(API_MAP.LOGIN), {
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
        if (response.status !== 200) {
          throw Error
        }
        return response.json()
      })
      .then((data) => {
        setAuthParamsToLocal(data?.access_token, data.refresh_token)
        setUserToLocal({first_name: data?.first_name, last_name: data?.last_name, profile_picture: data?.profile_picture})
        makeRequestLogged(getAPILink(API_MAP.USER_PROFILE), 'GET', null, data?.access_token)
          .then((response) => {
            return response.json()
          })
          .then((resp) => {
            if (resp.step && !resp.is_visible) {
              localStorage.setItem('user', JSON.stringify({...resp}))
              navigate(AUTH_CLINIC_MAP_STEP[resp.step.toString()])
            } else if (resp.error === 'No profile') {
              localStorage.setItem('user', JSON.stringify({...resp, step: '1'}))
              navigate(routes.ADD_PROFILE)
            } else {
              localStorage.setItem('user', JSON.stringify({...resp}))
              navigate(routes.HOMEPAGE)
            }
            window.location.reload()
          })
          .catch((err) => {
          })
        // fetch(getAPILink(API_MAP.USER_PROFILE), )
        // console.log(data.access_token)
        // console.log(data.email)
        // console.log(data.refresh_token)

      })
      .catch((err) => {
        setState({ ...state, server: { error: "Credentialele nu sunt corecte. Va rugam sa incercati din nou" } })
      })
  });


  return (
    <div className="login-page">
      <img alt={'vreau un doctor'} src="/images/login.svg" />
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>Email</label>
          <input className="full-width" type="email" name="email" value={state.email.value}
            onChange={handleChange} onBlur={isFormEmpty} />
          <label>Password</label>
          <input className="full-width" type="password" name="password" value={state.password.value}
            onChange={handleChange} onBlur={isFormEmpty} />
          <div className={'links'}>
            <Link to={routes.REGISTER} className="forgot-password">nu ai cont?</Link>
            <Link to={routes.FORGET_PASSWORD} className="forgot-password">ai uitat parola?</Link>
          </div>
          {state.server.error &&
            <div className={'error'}>{state.server.error}</div>
          }
          <button className={`button round custom-width ${!formValid ? 'disabled' : ''}`} onClick={handleSubmit} >Login</button>

        </form>
      </div>
    </div>
  );
}


export default Login;
