import React from 'react';
import AdminData from '../../AdminData/AdminData';

const DashboardAdminData = () => {


    //TODO get from API

    const selected = {
        firstName: "Oscar",
        lastName: "Gal",
        town: "Alba-Iulia",
        street: "Constantin Brancusi"
    }

    const [values, setValues] = React.useState(selected);

    const handleSubmit = (selected) => {
        setValues(selected)
    }

    return (
        <div className="dashboard-admin">
            <AdminData selected={values} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardAdminData;
