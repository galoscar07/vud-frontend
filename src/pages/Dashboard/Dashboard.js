import React, { useEffect, useState } from 'react';
import "./Dashboard.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AddUnit from '../AddUnit/AddUnit';
import Toolbar from "../../components/Header/Toolbar/Toolbar"
import { Outlet } from 'react-router-dom';
const Dashboard = () => {


    const renderDashbaord = () => {
        return (
            <React.Fragment>
                <Outlet/>
                    <Toolbar />
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
