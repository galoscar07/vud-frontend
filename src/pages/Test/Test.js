import React from 'react'
import {NavLink, useLocation} from "react-router-dom";
import {API_MAP, getAPILink, routes} from "../../utils/routes";

function Test() {

    return (
        <div className="home-page">
            <NavLink to={routes.LOGIN}>
                <div className="button">
                    Pagina autentificare
                </div>
            </NavLink>
            <NavLink to={routes.REGISTER}>
                <div className="button">
                    Register
                </div>
            </NavLink>
            <NavLink to={routes.HOMEPAGE}>
                <div className="button">
Home                </div>
            </NavLink>
            <NavLink to={routes.FORGET_PASSWORD}>
                <div className="button">
                    Forgot
                </div>
            </NavLink>
            <NavLink to={routes.ADMIN_DATA}>
                <div className="button">
                    Admin data
                </div>
            </NavLink>
            <NavLink to={routes.ADD_UNIT}>
                <div className="button">
                  Add unit
                </div>
            </NavLink>
            <NavLink to={routes.THANK_YOU}>
                <div className="button">
                   Thank you
                </div>
            </NavLink>
            <NavLink to={routes.EMAIL_VERIFICATION}>
                <div className="button">
                    Email verification
                </div>
            </NavLink>
            <NavLink to={routes.PROFILE}>
                <div className="button">
                   Clinic profile
                </div>
            </NavLink>
            <NavLink to={routes.CLINIC_PAGE}>
                <div className="button">
                   Clinic page
                </div>
            </NavLink>
        </div>
    );
}

export default Test;
