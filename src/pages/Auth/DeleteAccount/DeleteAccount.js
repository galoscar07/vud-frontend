import React from 'react'
import './DeleteAccount.scss'

import {Link} from "react-router-dom";
import {routes} from "../../../utils/routes";

const DeleteAccount = (props) => {
    const [email, setEmail] = React.useState('');
    const [step, setStep] = React.useState(0)

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    console.log(props)


    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(1)
    };

    const renderContent = () => {
        switch (step) {
            case 0:
                return (
                  <React.Fragment>
                    <span className="info-text">
                      Pentru a șterge contul dumneavoastră trebuie să accesați linkul pe care vi-l trimitem
                      la adresa de email cu care ați creat contul.
                    </span>
                    <span className="info-text">
                      Vă rugăm să introduceți mai jos emailul cu care ați creat contul dumneavoastră de pe Vreauundoctor.ro                    </span>
                    <form onSubmit={handleSubmit}>
                      <label>Email</label>
                      <input className="full-width" type="text" value={email}
                             onChange={handleEmail}/>
                      <input className="button margin-top" type="submit" value="Trimite email"/>

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
            <img alt={'Imagine stergere cont'} src="/images/delete-account.svg"/>
            <div className="forget-container">
                <h1>Solicitare ștergere cont Vreauundoctor</h1>
                {renderContent()}
            </div>
        </div>
    );
}


export default DeleteAccount;
