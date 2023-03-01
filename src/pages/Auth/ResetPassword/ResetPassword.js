import React from 'react'
import './ResetPassword.scss'

import {Link} from "react-router-dom";
import {routes} from "../../../utils/routes";

const ResetPassword = (props) => {
    const [email, setEmail] = React.useState('');
    const [step, setStep] = React.useState(0)

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    console.log(props)


    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Add call here
        setStep(1)
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
                             onChange={handleEmail}/>
                      <input className="button margin-top" type="submit" value="Schimbare parola"/>

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
        <div className="reset-password-page">
            <img alt="Imagine uitat parola" src="/images/forget-password.svg"/>
            <div className="reset-container">
                <h1>Schimbare parolă</h1>
                {renderContent()}
            </div>
        </div>
    );
}


export default ResetPassword;
