import React, { useEffect } from 'react';
import "./Dashboard.scss";
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import { Outlet } from 'react-router-dom';
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import _ from "lodash";

const Dashboard = () => {
    const [userProfile, setUserProfile] = React.useState({});
    const [unitTypes, setUnitTypes] = React.useState({});
    useEffect(() => {
        makeRequestLogged(
            getAPILink(API_MAP.USER_PROFILE),
            'GET',
            null,
            getAuthTokenFromLocal()
        )
            .then((res) => res.json())
            .then((res) => {
                setUnitTypes(res.medical_unit_types.map((re)=>{
                    return { 
                        label: re.label,
                        value:re.id,
                    }
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const renderDashbaord = () => {
        return (
            <React.Fragment>
                <Toolbar />
                <Outlet context={unitTypes} />
            </React.Fragment>
        )
    }

    return (
        <div className="dashboard-page">
            {renderDashbaord()}
        </div>
    )
}

export default Dashboard;
