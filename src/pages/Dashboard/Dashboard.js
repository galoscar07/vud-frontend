import React from 'react';
import "./Dashboard.scss";
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import { Outlet } from 'react-router-dom';
const Dashboard = () => {


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
