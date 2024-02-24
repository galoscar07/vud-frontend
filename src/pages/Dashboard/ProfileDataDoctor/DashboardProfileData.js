import React, {useEffect} from 'react';
import DoctorPage from '../../DoctorPage/DoctorPage';
import {useOutletContext} from "react-router-dom";
import DoctorData from "../../DoctorData/DoctorData";

const DashboardProfileDataDoctor = () => {
    const userProfile = useOutletContext()

    const [values, setValues] = React.useState(null);

    const handleSubmit = (selected) => {
        console.log(selected,'sel here ')
        setValues(selected)
    }
    if (userProfile.id === undefined) {
        return
    }

    return (
        <div className="dashboard-profile">
            <DoctorData
                selected={userProfile}
                onSubmit={handleSubmit}
                isDashboard
            />
        </div>
    )
}

export default DashboardProfileDataDoctor;
