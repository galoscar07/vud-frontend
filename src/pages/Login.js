import React from 'react'
import "../styles/login.scss"

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [code, setCode] = React.useState('');
    const [areTermsChecked, setTermsChecked] = React.useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const handleTermsChecked = (event) => {
        console.log(areTermsChecked)
        setTermsChecked(!areTermsChecked);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, code, areTermsChecked)
    };


    return (
        <div className="login-page">
            <img src="/images/login.svg"/>
            <div className="auth-container">
                <h1>Autentificare</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input className="full-width" type="text" value={email}
                           onChange={handleEmail}/>
                    <div className="checkbox-container">
                        <input className="checkbox" type="checkbox" value={code} onChange={handleTermsChecked}/>
                        <label>Sunt de acord cu <span>termenii si conditiile</span></label>
                    </div>
                    <span className="code-label"> Ti-am trimis un cod de verificare pe email, te rugam sa introduci codul mai jos pentru validarea contului</span>
                    <div className="input-validate-container">
                        <input type="text" value={code}
                               onChange={handleCode}/>
                        <input className="button" type="submit" value="Valideaza"/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;
