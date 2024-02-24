import React, { useEffect } from 'react';
import "./Dashboard.scss";
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import { Outlet, useNavigate } from 'react-router-dom';
import { API_MAP, getAPILink, makeRequestLogged, AUTH_CLINIC_MAP_STEP, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import _ from "lodash";

const DashboardWrapper = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = React.useState({});

    useEffect(() => {
        makeRequestLogged(getAPILink(API_MAP.USER_PROFILE), 'GET', null, getAuthTokenFromLocal())
            .then((re) => {
                if (re.status !== 200) {
                    navigate(routes.LOGIN)
                } else {
                    return re.json()
                }
            })
            .then((resp) => {
                setUserProfile(resp)
            })
        // const user = JSON.parse(localStorage.getItem('user') || null)
        // setUserProfile(user)
    },[])

    const renderDashboard = () => {
        return (
            <React.Fragment>
                <Toolbar user={userProfile}/>
                <Outlet context={userProfile}  />
            </React.Fragment>
        )
    }

    return (
        <div className="dashboard-page">
            {renderDashboard()}
        </div>
    )
}

export default DashboardWrapper;
