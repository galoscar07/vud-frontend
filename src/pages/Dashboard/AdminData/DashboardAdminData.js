import React, { useEffect, useState } from 'react';
import AdminData from '../../AdminData/AdminData';

const DashboardAdminData = () => {

    const handleSubmit = () => { //TODO
    }
    const selected = {
        firstName: "Oscar",
        lastName: "Gal",
        town: "Alba-Iulia",
        street: "Constantin Brancusi"
    }
    return (
        <div className="dashboard-admin">
            <AdminData isDashboard selected={selected} onSubmit={handleSubmit} />        </div>
    )
}

export default DashboardAdminData;
