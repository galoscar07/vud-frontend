import React, { useEffect } from 'react';
import "./Dashboard.scss";
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import { Outlet, useNavigate } from 'react-router-dom';
import { API_MAP, getAPILink, makeRequestLogged, AUTH_CLINIC_MAP_STEP, routes } from "../../utils/routes";
import {getAuthTokenFromLocal, logOutFromStorage} from "../../utils/localStorage";
import _ from "lodash";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || null)
        if (user === null) navigate(routes.LOGIN)
        if (!user.is_visible) {
            navigate(AUTH_CLINIC_MAP_STEP[user.step.toString()])
        }
    },[])
    
    useEffect(() => {
        makeRequestLogged(
            getAPILink(API_MAP.USER_PROFILE),
            'GET',
            null,
            getAuthTokenFromLocal()
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.code === "token_not_valid") {
                    logOutFromStorage()
                    window.location.reload()
                    navigate(routes.HOMEPAGE)
                }
                if (res.is_doctor) {
                    navigate(routes.DASHBOARD_DOCTOR_DATA)
                }
                if (res.is_clinic) {
                    navigate(routes.DASHBOARD_PROFILE_DATA)
                }
            })
            .catch((err) => {
                navigate(routes.HOMEPAGE)
            })
    }, [])

    return null
}

export default Dashboard;
