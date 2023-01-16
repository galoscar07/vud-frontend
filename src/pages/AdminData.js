import React from 'react'
import "../styles/adminData.scss"

const AdminData = () => {

    const [values, setValues] = React.useState({});
    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({...prevState, [title]: value}));
    };

    const handleSubmit = (event) => {
        console.log(values);
        event.preventDefault();
    };


    return (
        <div className="admin-data-page">
            <div className="data-container">
                <img src="images/User.svg"/>
                <h1>Date administrator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="contact-data">
                        <div className="container-title">Date de contact</div>
                        <div className="fields-wrapper">
                            <div className="input-wrapper">
                                <label>*Nume</label>
                                <input type="text" required value={values.lastName}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'lastName');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>*Prenume</label>
                                <input type="text" required value={values.firstName}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'firstName');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>Telefon</label>
                                <input type="text" value={values.phoneNo}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'phoneNo');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>Email de contact</label>
                                <input type="text" value={values.email}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'email');
                                       }}/>
                            </div>
                        </div>
                    </div>
                    <div className="company-data">
                        <div className="container-title">Date de companie</div>
                        <div className="fields-wrapper">
                            <div className="input-wrapper">
                                <label>Functia</label>
                                <input type="text" value={values.position}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'position');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>Compania</label>
                                <input type="text" value={values.company}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'company');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>*Strada</label>
                                <input type="text" required value={values.street}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'street');
                                       }}/>
                            </div>
                            <div className="input-wrapper">
                                <label>Numarul</label>
                                <input type="text" value={values.streetNo}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'streetNo');
                                       }}/>
                            </div>
                        </div>
                    </div>
                    <input className="button" type="submit" value="Salveaza"/>

                </form>
            </div>
        </div>
    )
        ;
}


export default AdminData;
