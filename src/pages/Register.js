import React from 'react'
import "../styles/register.scss"

const Register = () => {
    const [email, setEmail] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [areTermsChecked, setTermsChecked] = React.useState(false);
    const [step, setStep] = React.useState(0)

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleTermsChecked = (event) => {
        setTermsChecked(!areTermsChecked);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(1)
    };


    return (
        <div className="register-page">
            <img src="/images/login.svg"/>
            <div className="auth-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    {step === 0 &&
                        <React.Fragment>
                            <label>Email</label>
                            <input className="full-width" type="text" value={email}
                                   onChange={handleEmail}/>
                            <label>Password</label>
                            <input className="full-width" type="password" value={password}
                                   onChange={handlePassword}/>
                            <label>Confirm password</label>
                            <input className="full-width" type="password" value={confirmPassword}
                                   onChange={handleConfirmPassword}/>
                            <div className="checkbox-container">
                                <div>
                                    <input className="checkbox" type="checkbox" value={areTermsChecked}
                                           onChange={handleTermsChecked}/>
                                    <label>Sunt de acord cu <span>termenii si conditiile</span></label>
                                </div>
                            </div>
                            <input className="button" type="submit" value="Register"/>
                        </React.Fragment>
                    }
                    { step === 1 &&
                        <span className="code-label"> Ti-am trimis un link in vederea conectarii pe email, te rugam sa accesezi link-ul pentru a termina procesul de autentificare</span>
                    }
                </form>
            </div>
        </div>
    );
}


export default Register;
