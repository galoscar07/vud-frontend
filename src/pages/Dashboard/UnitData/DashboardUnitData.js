import React from 'react';
import AddUnit from '../../AddUnit/AddUnit';

const DashboardUnitData = () => {
    //TODO get this from API;
    const selected = [
        { value: 1, label: "Spital de Urgenta" },
        { value: 2, label: "Spital Privat" }
    ]

    const handleSubmit = () => { //TODO
    }

    return (
        <div className="dashboard-unit">
            <AddUnit selected={selected} onSubmit={handleSubmit} />
        </div>
    )
}

export default DashboardUnitData;
