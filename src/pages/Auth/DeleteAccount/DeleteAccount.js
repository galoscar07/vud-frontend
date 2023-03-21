import React from 'react'
import './DeleteAccount.scss'
import {useNavigate} from "react-router-dom";

import {Link} from "react-router-dom";
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../../utils/routes";
import {getAuthTokenFromLocal, logOutFromStorage} from "../../../utils/localStorage";

const DeleteAccount = (props) => {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate()

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        makeRequestLogged(
          getAPILink(API_MAP.DELETE_PROFILE),
          'DELETE',
          JSON.stringify({
            'confirm_password': email
          }),
          getAuthTokenFromLocal()
        )
          .then((response) => response.json())
          .then((resp) => {
            logOutFromStorage()
            navigate(routes.HOMEPAGE)
          })
          .catch((err) => {
            logOutFromStorage()
            navigate(routes.HOMEPAGE)
          })
    };


    return (
        <div className="forget-password-page">
            <img alt={'Imagine stergere cont'} src="/images/delete-account.svg"/>
            <div className="forget-container">
                <h1>Solicitare ștergere cont Vreauundoctor</h1>
                <span className="info-text">
                  Pentru a șterge contul dumneavoastră trebuie să introduceti parola pentru contul dumneavoastră de pe Vreauundoctor.ro
                </span>
                <span className="info-text">
                  Aceasta actiune nu este reversibila.
                </span>
                <form>
                  <label>Parola</label>
                  <input className="full-width" type="password" value={email}
                         onChange={handleEmail}/>
                  <div onClick={handleSubmit} className="button danger margin-top">
                    Sterge cont
                  </div>
                </form>
            </div>
        </div>
    );
}


export default DeleteAccount;
