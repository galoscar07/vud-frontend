import React, { useEffect } from 'react'
import "./ResendEmail.scss"
import { API_MAP, getAPILink, routes } from "../../../utils/routes"
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

const ResendEmail = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        email: {
            value: '',
            error: null,
        },
        server: {
            error: null,
        },
        isEmailSent: false,
    })

    const handleSubmitResendEmail = (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            return
        }

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
                } else setState({...state, isEmailSent: true})
                return response.json()
            })
            .then((data) => { })
            .catch((err) => { })
    }

    const isFormValid = () => {
        let stateCopy = _.cloneDeep(state)
        stateCopy.email.error = null
        if (!state.email.value) {
            stateCopy.email.error = 'Acest camp nu poate fi gol'
        }
        if (!RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(state.email.value)) {
            stateCopy.email.error = 'Email-ul trebuie sa fie de forma aaa@bbb.ddd'
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
    const [formValid, setFormValid] = React.useState(false)

    const isFormEmpty = () => {
        if (state.email.value) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }
    useEffect(() => {
        isFormEmpty()
    }, [state])

    return (
        <div className="resend-email-page">
            <img alt={'vreau un doctor'} src="/images/login.svg" />
            {!state.isEmailSent ? (
                <div className="auth-container">
                    <h1>Retrimite email</h1>
                    <form autoComplete="off">
                        <label>Email</label>
                        <input className={`full-width ${state.email.error && 'error'}`} type="email"
                            name="email" value={state.email.value} onChange={handleChange} />
                        {state.email.error &&
                            <div className={'error'}>{state.email.error}</div>
                        }
                        <button
                            className={`button custom-width round ${!formValid ? 'disabled' : ''}`}
                            onClick={handleSubmitResendEmail}
                            disabled={!formValid}
                        >Retrimite email</button>
                    </form>
                </div>
            ) : <React.Fragment>
                <span>
                    Ti-am trimis un link in vederea conectarii pe email, te rugam sa accesezi link-ul pentru a termina procesul de autentificare.
                    In cazul in care nu ai primit email-ul da click
                    <span onClick={handleSubmitResendEmail} className="code-label click"> aici </span>
                </span>
            </React.Fragment>
            }
        </div>
    )
}

export default ResendEmail;