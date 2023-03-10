import React, { useEffect } from 'react'
import './ResetPassword.scss'
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../../utils/routes";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ResetPassword = (props) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [newPass, setPassword] = React.useState('');
  const [confirmNewPass, setConfirmPassword] = React.useState('');
  const [step, setStep] = React.useState(0)
  const search = useLocation().search
  const searchParams = new URLSearchParams(search)
  const [token, setToken] = React.useState('');
  const [uidb, setUidb] = React.useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleNewPass = (event) => {
    setPassword(event.target.value)
  }
  const handleConfirmNewPass = (event) => {
    setConfirmPassword(event.target.value)
  }

  useEffect(() => {
    const token = searchParams.get('token')
    const uidb = searchParams.get('uidb')

    setToken(token);
    setUidb(uidb)
    if (uidb && token) {
      fetch(
        getAPILink(API_MAP.RESET_PASS + token + "/" + uidb), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then((response) => {
          if (response.status !== 200) {
            throw Error
          }
          setStep(2)
          return response.json()
        })
        .then((data) => {
          setLoading(false)
        })
        .catch((err) => {
          //TODO pls look why we have 200 here and still catches error;
          setLoading(false)
          setError("Ceva nu a funcționat. Vă rugăm să încercați în câteva minute")
        })
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      getAPILink(API_MAP.FORGET_PASSWORD), {
      method: 'POST',
      body: JSON.stringify({
        email: email,
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
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError("Ceva nu a funcționat. Vă rugăm să încercați în câteva minute")
      })

  };
  const handleSubmitNewPass = (event) => {
    event.preventDefault();
    if (newPass !== confirmNewPass) {
      setError("Parolele introduse nu sunt identice")
    } else {
      fetch(
        getAPILink(API_MAP.RESET_PASS_COMPLETE), {
        method: 'PATCH',
        body: JSON.stringify({
          password: newPass,
          uidb: uidb,
          token: token
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
          setLoading(false)
          setStep(3)
        })
        .catch((err) => {
          setLoading(false)
          setError("Ceva nu a funcționat. Vă rugăm să încercați în câteva minute")
        })
    }
  };


  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <span className="info-text">
              Pentru a schimba parola trebuie să accesați linkul pe care vi-l trimitem la adresa de email cu
              care ați creat contul.
            </span>
            <span className="info-text">
              Vă rugăm să introduceți mai jos emailul cu care ați creat contul dumneavoastră:
            </span>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input className="full-width" type="text" value={email}
                onChange={handleEmail} />

              <button className={`button margin-top`} onClick={handleSubmit} >Schimbare parola</button>

            </form>
          </React.Fragment>
        )

      case 1:
        return (
          <form className={"bigger"}>
            <span className="info-text bigger-text"> Ti-am trimis un cod link pentru recuperarea parolei pe email, te rugam sa urmaresti intructiunile de conectare din email.</span>
            <Link to={routes.LOGIN}>{"< "}Inapoi la pagina de autentificare</Link>
            {error &&
              <div className={'error'}>{error}</div>
            }
          </form>
        )
      default:
        break;

      case 2:
        return (
          <React.Fragment>
            <span className="info-text">
              Vă rugăm să creati o parola noua.
            </span>
            <form onSubmit={handleSubmit}>
              <label>Parola</label>
              <input className="full-width" type="password" value={newPass}
                onChange={handleNewPass} />
              <label>Confirmare Parola</label>
              <input className="full-width" type="password" value={confirmNewPass}
                onChange={handleConfirmNewPass} />
              <button className={`button margin-top`} onClick={handleSubmitNewPass} >Schimbare parola</button>
              {error &&
                <div className={'error'}>{error}</div>
              }
            </form>
          </React.Fragment>
        )

      case 3:
        return (
          <form className={"bigger"}>
            <span className="info-text bigger-text"> Parola a fost schimbata cu success.</span>
            <Link to={routes.LOGIN}>{"< "}Inapoi la pagina de autentificare</Link>
            {error &&
              <div className={'error'}>{error}</div>
            }
          </form>
        )
    }
  }


  return (
    <div className="reset-password-page">
      <img alt="Imagine uitat parola" src="/images/forget-password.svg" />
      <div className="reset-container">
        <h1>Schimbare parolă</h1>
        {renderContent()}
      </div>
    </div>
  );
}


export default ResetPassword;
