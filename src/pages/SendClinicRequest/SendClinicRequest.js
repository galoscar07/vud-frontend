import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./SendClinicRequest.scss"
import {API_MAP, getAPILink, REACT_RECAPTCHA_KEY, routes} from "../../utils/routes";
import ReCAPTCHA from "react-google-recaptcha";

const SendClinicRequest = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        name: {
            value: '',
            error: ''
        },
        email: {
            value: '',
            error: ''
        },
        message: {
            value: '',
            error: ''
        },
        server: {
            error: ''
        }
    })
    const [isCopyChecked, setIsCopyChecked] = useState(false)
    const [clinic, setClinic] = useState({})
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptcha = (key) => {
        setCaptchaValue({
            captcha: true,
            'g-recaptcha-response': key
        })
    };

    // Component did mount to get the clinic search params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const myParam = params.get('clinic');
        setClinic(JSON.parse(myParam))
    }, []);

    // Form changing functions
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: { ...state[event.target.name], value: event.target.value } })
    }
    const handleTermsChecked = () => {
        setIsCopyChecked(!isCopyChecked);
    };

    // Handle form submission
    const isFormValid = () => {
        const copyState = {...state, name: {...state.name, error: ''}, email: {...state.email, error: ''}}
        let ok = true
        if (!state.name.value) {
            copyState.name.error = "Acest camp este obligatoriu!"
            ok = false
        }
        if (!state.email.value) {
            copyState.email.error = "Acest camp este obligatoriu!"
            ok = false
        }
        if (!captchaValue) {
            copyState.server.error = "Captcha nu a fost completat."
            ok = false
        }
        setState(copyState)
        return ok
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isFormValid()) return
        fetch(
            getAPILink(API_MAP.SEND_MESSAGE_CLINIC), {
                method: 'POST',
                body: JSON.stringify({
                    email: state.email.value,
                    name: state.name.value,
                    message: state.message.value,
                    checkmarkIfSendCopy: isCopyChecked,
                    clinicId: clinic.id,
                    'g-recaptcha-response': captchaValue["g-recaptcha-response"]
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (!!data.error) {
                    setState({...state, server: {error: "Ceva a mers prost. Va rugam incercati mai tarziu."}})
                } else {
                    window.close();
                }
            })
            .catch(() => {
                setState({ ...state, server: { error: "Ceva a mers prost. Va rugam incercati mai tarziu" } })
            })
        recaptchaRef.current.reset()
    }

    // Redirect home
    const redirectToHome = () => {
        navigate(routes.CLINIC_PAGE + `/?id=${clinic.id}`)
    }

    const recaptchaRef = React.createRef()

    return (
        <div className="send-clinic-request">
            <button onClick={redirectToHome} className={`button redirect-button border-button round desktop`}>Inapoi la profilul clinicii</button>
            <div className="white-container">
                <div className="left-container">
                    <h3>Contactează unitatea medicală</h3>
                    <div className="image-container">
                        <img className="clinic-logo" src={clinic.imgUrl} alt="clinic-logo" />
                    </div>
                    <div className="info-text">{clinic?.typeOfClinic}</div>
                    <h1>{clinic.name}</h1>
                    <div className="colored-text">{clinic?.address}</div>
                </div>
                <div className="right-container">
                    <form autoComplete="off">
                        <label>*Nume</label>
                        <input className={`full-width ${state.name.error && 'error'}`} type="text"
                               name="name" value={state.name.value} onChange={handleChange} />
                        {state.name.error &&
                            <div className={'error'}>{state.name.error}</div>
                        }
                        <label className="margin-top-20px">*Adresa de email</label>
                        <input className={`full-width ${state.email.error && 'error'}`} type="email"
                               name="email" value={state.email.value} onChange={handleChange} />
                        {state.email.error &&
                            <div className={'error'}>{state.email.error}</div>
                        }
                        <label className="margin-top-20px">Mesaj</label>
                        <textarea className={`full-width ${state.message.error && 'error'}`}
                                       name="message" value={state.message.value} onChange={handleChange} />
                        {state.message.error &&
                            <div className={'error'}>{state.message.error}</div>
                        }
                        <div className="checkbox-container margin-top-20px">
                            <div>
                                <input className="checkbox" type="checkbox" value={isCopyChecked}
                                       onChange={handleTermsChecked} />
                                <label>Doresc o copie a mesajului</label>
                            </div>
                        </div>
                        <div className="info-text">
                            Câmpurile marcare cu * sunt obligatorii
                        </div>
                        <div className={"captcha"}>
                            <ReCAPTCHA
                                onChange={handleCaptcha}
                                ref={recaptchaRef}
                                sitekey={REACT_RECAPTCHA_KEY}
                            />
                        </div>
                        {state.server.error &&
                            <div className={'error'}>{state.server.error}</div>
                        }
                        <button
                            className={`button custom-width round`}
                            onClick={handleSubmit}
                        >Trimite mesaj</button>
                    </form>
                </div>
            </div>
            <button onClick={redirectToHome} className={`button redirect-button border-button round mobile`}>Inapoi la profilul clinicii</button>
        </div>
    );
}


export default SendClinicRequest;
