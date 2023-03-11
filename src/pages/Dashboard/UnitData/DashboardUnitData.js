import React from 'react';
import AddUnit from '../../AddUnit/AddUnit';

const DashboardUnitData = () => {
    //TODO get this from API;
    const selected = [
        { value: 1, label: "Spital de Urgenta" },
        { value: 2, label: "Spital Privat" }
    ]
    
    const [values, setValues] = React.useState(selected);

    const handleSubmit = (selected) => {
        setValues(selected)
    }

    return (
        <div className="dashboard-unit">
            <AddUnit selected={values} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardUnitData;
