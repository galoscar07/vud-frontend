import React from 'react'
import "../styles/login.scss"
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";

const ForgetPassword = (props) => {
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
                  <form onSubmit={handleSubmit}>
                      <label>Email</label>
                      <input className="full-width" type="text" value={email}
                             onChange={handleEmail}/>
                      {/*<span className="code-label"> Ti-am trimis un cod de verificare pe email, te rugam sa introduci codul mai jos pentru validarea contului</span>*/}
                      <input className="button margin-top" type="submit" value="Login"/>

                  </form>
                )
            case 1:
                return (
                  <form>
                      <span className="code-label bigger-text"> Ti-am trimis un cod link pentru recuperarea parolei pe email, te rugam sa urmaresti intructiunile de conectare din email.</span>
                      <Link to={routes.LOGIN}>{"< "}Inapoi la pagina de autentificare</Link>
                  </form>
                )
        }
    }


    return (
        <div className="login-page">
            <img src="/images/login.svg"/>
            <div className="auth-container">
                <h1>Ai uitat parola?</h1>
                {renderContent()}
            </div>
        </div>
    );
}


export default ForgetPassword;
