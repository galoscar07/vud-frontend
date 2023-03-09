import React from 'react';
import ClinicProfile from '../../ClinicProfile/ClinicProfile';

const DashboardProfileData = () => {
    //TODO get from API
    const selected = {
        clinic_name: "Spital test",
        clinic_street: "Str. Constantin Brancusi",
        clinic_number: "119",
        clinic_town: "Alba-Iulia",
        clinic_county: "Alba",
        primary_phone: "074888392",
        primary_email: "test@test.com",
    }
    const [values, setValues] = React.useState(selected);

    const handleSubmit = (selected) => {
        setValues(selected)
    }

    return (
        <div className="dashboard-profile">
            <ClinicProfile selected={values} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardProfileData;
