import React from 'react'
import "../styles/login.scss"
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";
import "./login.scss"

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [areTermsChecked, setTermsChecked] = React.useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleTermsChecked = (event) => {
        setTermsChecked(!areTermsChecked);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <div className="login-page">
            <img src="/images/login.svg"/>
            <div className="auth-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input className="full-width" type="text" value={email}
                           onChange={handleEmail}/>
                    <label>Password</label>
                    <input className="full-width" type="password" value={password}
                           onChange={handlePassword}/>
                    <div className={'links'}>
                        <Link to={routes.REGISTER} className="forgot-password">nu ai cont?</Link>
                        <Link to={routes.FORGET_PASSWORD} className="forgot-password">ai uitat parola?</Link>
                    </div>

                    {/*<span className="code-label"> Ti-am trimis un cod de verificare pe email, te rugam sa introduci codul mai jos pentru validarea contului</span>*/}
                    <input className="button" type="submit" value="Login"/>

                </form>
            </div>
        </div>
    );
}


export default Login;
