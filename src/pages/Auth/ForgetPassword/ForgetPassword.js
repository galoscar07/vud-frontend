import React from 'react'
import './ForgetPassword.scss'
import {API_MAP, getAPILink, routes} from "../../../utils/routes";
import { Link } from "react-router-dom";
import _ from "lodash";

const ForgetPassword = (props) => {
  const [state, setState] = React.useState({
    email: {
      value: '',
      error: null,
    },
    server: {
      error: null,
    }
  })
  const [email, setEmail] = React.useState('');
  const [step, setStep] = React.useState(0)
  const [link, setLink] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(email, 'dsads')
  };

  console.log(props)


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
        console.log('ERRR')
        setState({ ...state, server: { error: "Ceva a mers prost. Va rugam incercati mai tarziu" } })
      })

    // setStep(1)
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
                 {state.server.error &&
                <div className={'error'}>{state.server.error}</div>
              }
              <input className="button margin-top" type="submit" value="Schimbare parola" />
            </form>
          </React.Fragment>
        )

      case 1:
        return (
          <form className={"bigger"}>
            <span className="info-text bigger-text"> Ti-am trimis un cod link pentru recuperarea parolei pe email, te rugam sa urmaresti intructiunile de conectare din email.</span>
            <Link to={routes.LOGIN}>{"< "}Inapoi la pagina de autentificare</Link>
          </form>
        )
      default:
        break;
    }
  }


  return (
    <div className="forget-password-page">
      <img alt="Imagine uitat parola" src="/images/forget-password.svg" />
      <div className="forget-container">
        <h1>Schimbare parolă</h1>
        {renderContent()}
      </div>
    </div>
  );
}


export default ForgetPassword;
