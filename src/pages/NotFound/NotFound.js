import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.scss"
import { routes } from "../../utils/routes";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useState('')
    const handleSearch = () => {
        navigate(`${routes.FILTER_PAGE}?searchTerm=${state}`)
    }
    const redirectToHome = () => {
        navigate(routes.HOMEPAGE);
    }

    return (
        <div className="not-found-page">
            <div className="white-container">
                <img alt={'404'} src="/images/404.svg" />
                <div className="text"><span className="bold">Oh, nu!</span> Nu am găsit pagina!<br />
                    Probabil a plecat la o consultație medicală</div>
                <form onSubmit={(ev) => { ev.preventDefault() }} className="searchbar">
                    <input value={state} onChange={(ev) => setState(ev.target.value)} className="search" type="text" placeholder="Cauta clinica" name="search" />
                    <button className="button border-button" onClick={handleSearch}>Cauta</button>
                </form>
            </div>
            <button onClick={redirectToHome} className={`button redirect-button border-button round`}>Prima pagina</button>
        </div>
    );
}


export default NotFoundPage;
