import React from 'react';
import "./ThankYou.scss";

const ThankYou = () => {

    return (
        <div className="thank-you-page">
            <img src="/images/thank_you.svg"/>
            <h1>Vă mulțumim pentru înscrierea <br/>în comunitatea Vreauundoctor</h1>
            <div className="text-container">
                <p>Contul dvs. a fost creat cu succes! <br/> După ce acesta va fi aprobat vă vom trimite un email cu un link de activare. </p>
                <p>Vă rugăm să dați click pe acel link pentru a putea intra în contul dumneavoastră</p>
            </div>
            <input className="button" value="Pagina principală"/>
        </div>
    );
}

export default ThankYou;
