import React, {useEffect} from 'react';
import AddUnit from '../../AddUnit/AddUnit';
import { useOutletContext } from "react-router-dom";
import { getAuthTokenFromLocal } from "../../../utils/localStorage";
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../../utils/routes";


const DashboardUnitData = () => {
    const userProfile = useOutletContext()

    const [values, setValues] = React.useState([]);

    useEffect(() => {
        setValues(userProfile?.medical_unit_types?.map((el) => { return { value: el.id, label: el.label } }))
    }, [userProfile])

    const handleSubmit = (selected) => {
        setValues(selected)
        const listOfIds = values.map((el) => { return el.value })
        makeRequestLogged(
            getAPILink(API_MAP.PUT_MEDICAL_TYPES),
            'PUT',
            JSON.stringify({ list_of_clinic_types: listOfIds }),
            getAuthTokenFromLocal()
        )
            .then((response) => response.json())
            .catch((err) => {})
    }

    return (
        <div className="dashboard-unit">
            <AddUnit
                selected={values}
                onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardUnitData;
