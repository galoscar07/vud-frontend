import React, { useEffect, useState } from 'react';
import "./EmailVerification.scss";
import {NavLink, useLocation, useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { API_MAP, getAPILink, routes } from "../../utils/routes";

const EmailVerification = () => {
  // const search = useLocation().search
  // const searchParams = new URLSearchParams(search)
  let { token } = useParams();
  console.log("1" + window.location.href + ' ' + window.location.search)

  const [state, setState] = useState({
    loading: true,
    success: false,
    error: false,
    resendClicked: false
  })


  useEffect(() => {
    console.log(token)
    console.log("2" + window.location.href + ' ' + window.location.search)
    fetch(
      getAPILink(API_MAP.VERIFY_EMAIL) + `?token=${token}`, {
      method: 'GET',
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
        setState({ ...state, loading: false, success: true })
      })
      .catch((err) => {
        setState({ ...state, loading: false, error: true })
      })
      console.log(state, 'STATE')
  }, [])

  const renderThankYouPage = () => {
    return (
      <React.Fragment>
        <img alt={'Imagine multumire creare cont'} src="/images/thank-you.svg" />
        {
          state.error &&
          (
            <React.Fragment>
              <h1>A fost o problema in validarea contului <br />în comunitatea Vreauundoctor</h1>
              <div className="text-container">
                <p>
                  Va rugam apasati pe butonul de mai jos pentru a trimite un nou email pentru validarea contului
                  dumneavoastra de Vreauundoctor.
                </p>
              </div>
              <NavLink to={routes.RESEND_EMAIL}>
                <div 
                 className="button round">
                  Retrimite Email
                </div>
              </NavLink>
              {state.resendClicked && <h1>YESSSS</h1>}
            </React.Fragment>
          )
        }
        {
          state.success &&
          (
            <React.Fragment>
              <h1>Contul dumneavoastra a fost validat <br />în comunitatea Vreauundoctor</h1>
              <div className="text-container">
                <p>Contul dvs. a fost creat cu succes! <br /> După ce acesta va fi aprobat vă vom trimite un email cu un link de activare. </p>
                <p>Vă rugăm să dați click pe acel link pentru a putea intra în contul dumneavoastră</p>
              </div>
              <NavLink to={routes.LOGIN}>
                <div className="button round">
                  Pagina autentificare
                </div>
              </NavLink>
            </React.Fragment>
          )
        }
      </React.Fragment>
    )
  }

  return (
    <div className="thank-you-page">
      {state.loading
        ? <LoadingSpinner />
        : renderThankYouPage()
      }
    </div>
  )
}

export default EmailVerification;
