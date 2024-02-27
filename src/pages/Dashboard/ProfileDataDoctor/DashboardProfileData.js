import React from 'react';
import {useOutletContext} from "react-router-dom";
import DoctorData from "../../DoctorData/DoctorData";
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../../utils/routes";
import {getAuthTokenFromLocal} from "../../../utils/localStorage";

const DashboardProfileDataDoctor = () => {
    const userProfile = useOutletContext()

    const [values, setValues] = React.useState(null);

    const handleSubmit = (mapped, setStatus) => {
        const formData = new FormData()
        formData.append('profile_picture', mapped.clinic_name)
        formData.append('first_name', mapped.first_name)
        formData.append('last_name', mapped.last_name)
        formData.append('primary_phone', mapped.primary_phone)
        formData.append('primary_phone_vud', mapped.primary_phone_vud)
        formData.append('primary_email', mapped.primary_email)
        formData.append('website', mapped.website)
        formData.append('website_facebook', mapped.website_facebook)
        formData.append('website_google', mapped.website_google)
        formData.append('website_linkedin', mapped.website_linkedin)
        formData.append('website_youtube', mapped.website_youtube)
        formData.append('whatsapp', mapped.whatsapp)
        formData.append('description', mapped.description)
        formData.append('academic_degree', JSON.stringify(mapped.academic_degree))
        formData.append('speciality', JSON.stringify(mapped.speciality))
        formData.append('medical_skill', JSON.stringify(mapped.medical_skill))
        formData.append('clinic', mapped.clinic)
        formData.append('doctor', mapped.doctor)
        formData.append('contact_phone', mapped.contact_phone)
        formData.append('areTermsChecked', mapped.contact_phone)
        makeRequestLogged(
            getAPILink(API_MAP.PUT_DOCTOR_PROFILE),
            'PUT',
            formData,
            getAuthTokenFromLocal(),
            'multipart/form-data'
        ).then((response) => {
            if (response.status === 200) {
                setStatus("Success")
            } else {
                setStatus("Error")
            }
            window.scrollTo(0,0)
            return response.json()
        })
            .catch((err) => {
                setStatus("Error")
            })
    }

    if (userProfile.id === undefined) {
        return
    }

    return (
        <div className="dashboard-profile">
            <DoctorData
                selected={userProfile}
                status={values}
                onSubmit={handleSubmit}
                isDashboard
            />
        </div>
    )
}

export default DashboardProfileDataDoctor;
