import React from 'react';
import "./ThankYou.scss";
import {useNavigate} from "react-router-dom";
import {routes} from "../../utils/routes";

const ThankYou = () => {
  const navigate = useNavigate();

    return (
        <div className="thank-you-page">
            <img alt={'Imagine multumire creare cont'} src="/images/thank-you.svg"/>
            <h1>Vă mulțumim pentru înscrierea <br/>în comunitatea Vreauundoctor</h1>
            <div className="text-container">
                <p>Contul dvs. a fost creat cu succes! <br/> După ce acesta va fi aprobat vă vom trimite un email cu un link de activare. </p>
                <p>Vă rugăm să dați click pe acel link pentru a putea intra în contul dumneavoastră</p>
            </div>
          <div onClick={()=> {navigate(routes.HOMEPAGE)}} className="button" >
            Pagina principală
          </div>
        </div>
    );
}

export default ThankYou;
