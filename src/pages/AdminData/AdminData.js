import React from 'react'
import "./AdminData.scss"
import {API_MAP, getAPILink, makeRequestLogged, routes} from "../../utils/routes";
import {getAuthTokenFromLocal} from "../../utils/localStorage";
import {useNavigate} from "react-router-dom";

const AdminData = () => {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        phoneNoOpt: '',
        emailOpt: '',
        company: '',
        position: '',
        streetNo: '',
        // TODO Handle this
        county: 'Bucuresti',
        town: 'Bucuresti',
    });
    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
    };

    const handleSubmit = (event) => {
        console.log(values);
        event.preventDefault();
        // TODO Validate data
        makeRequestLogged(
          getAPILink(API_MAP.UPDATE_ADMIN_DATA),
          'PUT',
          JSON.stringify({
              first_name: values.firstName,
              last_name: values.lastName,
              phone_number:	values.phoneNo,
              contact_email:	values.email,
              phone_number_optional: values.phoneNoOpt,
              contact_email_optional: values.emailOpt,
              company: values.company,
              company_role: values.position,
              // TODO Handle change on value
              county: 'Bucuresti',
              town: 'Bucuresti',
              street: values.street,
              number: values.streetNo,
          }),
          getAuthTokenFromLocal()
        ).then((response) => response.json())
          .then((resp)=> {
              if (resp.success === 'Saved') {
                  navigate(routes.ADD_UNIT)
              }
          })
          .catch((err) => {

          })
    };

    const deleteFile = () => {
        // TODO Finish this
    }

    const updateList = (name, value) => {
        let input = document.getElementById('file');
        let output = document.getElementById('file-list');
        let children = "";
        for (let i = 0; i < input.files.length; ++i) {
            children += '<div class="selected-file">' + input.files.item(i).name + '<span onclick=console.log("delete")>' + ' <img src="/images/delete.svg"/>' + ' </span>' + '</div>';
        }
        output.innerHTML = '<div class="selected-file-wrapper">' + children + '</div>';
        handleFieldChange(name, value)
    }

    return (
        <div className="admin-data-page">
            <div className="data-container">
                <img src="/images/user.svg" />
                <h1>Date administrator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="contact-data">
                        <div className="container-title">Date de contact</div>
                        <div className="fields-wrapper">
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>*Nume</label>
                                    <input name="lastName" type="text" value={values.lastName}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>*Prenume</label>
                                    <input name="firstName" type="text" value={values.firstName}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>Telefon</label>
                                    <input name="phoneNo" type="text" value={values.phoneNo}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Email de contact</label>
                                    <input name="email" type="text" value={values.email}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>Telefon (optional)</label>
                                    <input name="phoneNoOpt" type="text" value={values.phoneNoOpt}
                                           onChange={(e) => {
                                               handleFieldChange(e.target.value, e.target.name);
                                           }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Email de contact (optional)</label>
                                    <input name="emailOpt" type="text" value={values.emailOpt}
                                           onChange={(e) => {
                                               handleFieldChange(e.target.value, e.target.name);
                                           }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="company-data">
                        <div className="container-title">Date de companie</div>
                        <div className="fields-wrapper">
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>Functia</label>
                                    <input name="position" type="text" value={values.position}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Compania</label>
                                    <input name="company" type="text" value={values.company}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="input-wrapper">
                                    <label>*Oras</label>
                                    <select id="city" name="city">
                                        <option value="Alba-Iulia">Alba-Iulia</option>
                                        <option value="Cluj-Napoca">Cluj-Napoca</option>
                                        <option value="Bucuresti">Bucuresti</option>
                                        <option value="Sibiu">Sibiu</option>
                                    </select>
                                </div>
                                <div className="input-wrapper">
                                    <label>Judet</label>
                                    <select id="county" name="county">
                                        <option value="Alba">Alba</option>
                                        <option value="Cluj">Cluj</option>
                                        <option value="Bucuresti">Bucuresti</option>
                                        <option value="Sibiu">Sibiu</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>*Strada</label>
                                    <input name="street" type="text" value={values.street}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Numarul</label>
                                    <input name='streetNo' type="text" value={values.streetNo}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>
                        Pentru a ne asigura ca actionati in numele entitatii a carei pagina o completati/recuperati,
                        va rugam sa parcurgeti pasii de identificare si confirmare:Incarcati o copie a CUI Incarcati
                        un document care sa ateste ca actionati in numele societatii al carui CUI l-ati incarcat
                        (certificat constatator din care sa reiasa ca sunteti administrator sau un document de
                        imputernicire din partea administratorului societatii – puteti folosi urmatorul model
                    </p>
                    <div className="image-upload">
                        <label htmlFor="file">
                            <img
                                src="images/upload.svg" />
                        </label>
                        <input style={{ display: "none" }} name="files" id="file" type="file" multiple
                            onChange={(e) => updateList(e.target.value, e.target.name)} />
                        <div id="file-list"></div>
                    </div>
                    <input className="button" type="submit" value="Mergi mai departe" />
                </form>
            </div>
        </div>
    )
}


export default AdminData;
