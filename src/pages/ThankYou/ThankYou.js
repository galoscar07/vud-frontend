import React, {useEffect} from 'react';
import "./ThankYou.scss";
import {useNavigate} from "react-router-dom";
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../utils/routes";
import {getAuthTokenFromLocal} from "../../utils/localStorage";

const ThankYou = () => {
  const navigate = useNavigate();
  useEffect(() => {
    makeRequestLogged(getAPILink(API_MAP.USER_PROFILE), 'GET', null, getAuthTokenFromLocal())
      .then((response) => {
        return response.json()
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify({...resp}))
        if (resp.is_visible) {
          navigate(routes.DASHBOARD)
        }
      })
      .catch((err) => {
        // navigate(routes.LOG_OUT)
      })
  }, [])
  return (
        <div className="thank-you-page">
            <img alt={'Imagine multumire creare cont'} src="/images/thank-you.svg"/>
            <h1>Vă mulțumim pentru înscrierea <br/>în comunitatea Vreauundoctor</h1>
            <div className="text-container">
                <p>Contul dvs. a fost creat cu succes! <br/> După ce acesta va fi aprobat vă vom trimite un email cu un link de activare. </p>
                <p>Vă rugăm să dați click pe acel link pentru a putea intra în contul dumneavoastră</p>
            </div>
          <div onClick={()=> {navigate(routes.HOMEPAGE)}} className="button round" >
            Pagina principală
          </div>
        </div>
    );
}

export default ThankYou;
