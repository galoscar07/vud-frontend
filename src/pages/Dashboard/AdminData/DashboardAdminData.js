import React from 'react';
import AdminData from '../../AdminData/AdminData';

const DashboardAdminData = () => {

    const handleSubmit = () => { //TODO
    }
    //TODO get from API

    const selected = {
        firstName: "Oscar",
        lastName: "Gal",
        town: "Alba-Iulia",
        street: "Constantin Brancusi"
    }
    return (
        <div className="dashboard-admin">
            <AdminData selected={selected} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardAdminData;
