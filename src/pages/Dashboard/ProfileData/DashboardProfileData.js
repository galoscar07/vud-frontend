import React from 'react';
import ClinicProfile from '../../ClinicProfile/ClinicProfile';
import {useOutletContext} from "react-router-dom";
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../../utils/routes";
import {getAuthTokenFromLocal} from "../../../utils/localStorage";

const DashboardProfileData = () => {
    const userProfile = useOutletContext()

    const [values, setValues] = React.useState();

    const handleSubmit = (selected, setVal) => {
        const formData = new FormData()
        formData.append('clinic_name', selected.clinic_name)
        formData.append('profile_picture', selected.clinic_name)
        formData.append('clinic_street', selected.clinic_street)
        formData.append('clinic_number', selected.clinic_number)
        formData.append('clinic_town', selected.clinic_town)
        formData.append('clinic_county', selected.clinic_county)
        formData.append('clinic_other_details', selected.clinic_other_details)
        formData.append('primary_phone', selected.primary_phone)
        formData.append('secondary_phone', JSON.stringify(selected.secondary_phones_sorted))
        formData.append('primary_email', selected.primary_email)
        formData.append('secondary_email', selected.secondary_email)
        formData.append('website', selected.website)
        formData.append('website_facebook', selected.website_facebook)
        formData.append('website_google', selected.website_google)
        formData.append('website_linkedin', selected.website_linkedin)
        formData.append('website_youtube', selected.website_youtube)
        formData.append('description', selected.description)
        formData.append('clinic_specialities', JSON.stringify(selected.clinic_specialities))
        formData.append('clinic_facilities', JSON.stringify(selected.clinic_facilities))
        formData.append('clinic_schedule', selected.clinic_schedule)
        formData.append('clinic', selected.clinic)
        formData.append('doctor', selected.doctor)
        makeRequestLogged(
            getAPILink(API_MAP.PUT_UPDATE_CLINIC_PROFILE),
            'PUT',
            formData,
            getAuthTokenFromLocal(),
            'multipart/form-data'
        )
            .then((response) =>{
                if (response.status === 200) {
                    setVal("Success")
                } else {
                    setVal("Error")
                }
                window.scrollTo(0,0)
                return response.json()
            })
            .catch((err) => {
                setVal("Error")
            })
    }

    if (userProfile.id === undefined) {
        return
    }

    return (
        <div className="dashboard-profile">
            <ClinicProfile status={values} isDashboard selected={userProfile} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardProfileData;
