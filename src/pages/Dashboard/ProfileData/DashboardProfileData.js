import React, { useEffect, useState } from 'react';
import AddProfile from '../../AddProfile/AddProfile';
import ClinicProfile from '../../ClinicProfile/ClinicProfile';

const DashboardProfileData = () => {

    const handleSubmit = () => { //TODO
    }
    const selected = {
        clinic_name: "Spital test",
        clinic_street: "Str. Constantin Brancusi",
        clinic_number: "119",
        clinic_town: "Alba-Iulia",
        clinic_county: "Alba",
        primary_phone: "074888392",
        primary_email: "test@test.com",
    }
    return (
        <div className="dashboard-profile">
            <ClinicProfile isDashboard values={selected} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardProfileData;
