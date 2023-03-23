import React, {useEffect, useState} from 'react';
import "./Dashboard.scss";
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import {Outlet, useNavigate} from 'react-router-dom';
import {AUTH_CLINIC_MAP_STEP, routes} from "../../utils/routes";
const Dashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    if (user === null) navigate(routes.LOGIN)
    if (!user.is_visible) {
      navigate(AUTH_CLINIC_MAP_STEP[user.step.toString()])
    }
  },[])

    const renderDashbaord = () => {
        return (
            <React.Fragment>
                <Toolbar />
                <Outlet />
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
