import React, { useEffect } from 'react'
import "./AdminData.scss"
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AdminData = (props) => {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        firstName: props?.selected?.firstName || '',
        lastName: props?.selected?.lastName || '',
        phoneNo: props?.selected?.phoneNo || '',
        email: props?.selected?.email || '',
        phoneNoOpt: props?.selected?.phoneNoOpt || '',
        emailOpt: props?.selected?.emailOpt || '',
        company: props?.selected?.company || '',
        position: props?.selected?.position || '',
        streetNo: props?.selected?.streetNo || '',
        street: props?.selected?.street || '',
        county: props?.selected?.county || 'Bucuresti',
        town: props?.selected?.town || 'Bucuresti',
        fileList: props?.selected?.fileList || [],
        files: props?.selected?.files || [],
        error: '',
        uploadWarning: ''
    });

    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.firstName.length === 0 || values.lastName.length === 0 || values.street.length === 0) {
            setValues({ ...values, error: "Va rugam sa completati campurile obligatorii" })
        }
        if (props.onSubmit) {
            props.onSubmit(values)
        }
        else {
            const formData = new FormData()
            formData.append('first_name', values.firstName)
            formData.append('last_name', values.lastName)
            formData.append('phone_number', values.phoneNo)
            formData.append('contact_email', values.email)
            formData.append('phone_number_optional', values.phoneNoOpt)
            formData.append('contact_email_optional', values.emailOpt)
            formData.append('company', values.company)
            formData.append('company_role', values.company_role)
            formData.append('county', values.county)
            formData.append('town', values.town)
            formData.append('street', values.street)
            formData.append('number', values.number)
            let files = []
            let input = document.getElementById('file');
            for (let i = 0; i < input.files.length; ++i) {
                if (i < 3) {
                    files.push(input.files.item(i))
                }
            }
            formData.append('file1', files[0])
            formData.append('file2', files[1])

            makeRequestLogged(
                getAPILink(API_MAP.UPDATE_ADMIN_DATA),
                'PUT',
                formData,
                getAuthTokenFromLocal(),
                'multipart/form-data'
            ).then((response) => response.json())
                .then((resp) => {
                    if (resp.success === 'Saved') {
                        localStorage.setItem('user', JSON.stringify({is_visible: false, step: '3'}))
                        navigate(routes.ADD_UNIT)
                    } else {
                        setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
                    }
                })
                .catch((err) => {
                    setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
                })
        }
    };

    const updateList = (name, value) => {
        let files;
        if (values.fileList) {
            files = values.fileList;
        } else files = [];
        let input = document.getElementById('file');
        for (let i = 0; i < input.files.length; ++i) {
            if (i < 3) {
                files.push(input.files.item(i).name)
            } else {
                setValues({ ...values, uploadWarning: "Va rugam adaugati maxim 2 fisiere." })
            }
        }
        setValues({ ...values, fileList: files })

        if (values.fileList.length > 2) {
            let maxFiles = values.fileList.slice(0, 2)
            setValues({ ...values, fileList: maxFiles })

        }
        handleFieldChange(name, value)
    }

    const deleteFile = (fileName) => {
        let updatedList = values.fileList.filter(function (item) {
            return item !== fileName;
        })
        let updatedListFi = values.files.filter(function (item) {
            return item.name !== fileName;
        })
        setValues({ ...values, fileList: updatedList, files: updatedListFi })
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
                                    <select id="town" name="town"
                                        onChange={(e) => handleFieldChange(e.target.value, e.target.name)}>
                                        <option value="Bucuresti">Bucuresti</option>
                                        <option value="Alba-Iulia">Alba-Iulia</option>
                                        <option value="Cluj-Napoca">Cluj-Napoca</option>
                                        <option value="Sibiu">Sibiu</option>
                                    </select>
                                </div>
                                <div className="input-wrapper">
                                    <label>Judet</label>
                                    <select id="county" name="county"
                                        onChange={(e) => handleFieldChange(e.target.value, e.target.name)}>
                                        <option value="Bucuresti">Bucuresti</option>
                                        <option value="Alba">Alba</option>
                                        <option value="Cluj">Cluj</option>
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
                            <img className="upload-photo"
                                src="/images/upload_icon.svg" />
                        </label>
                        <input style={{ display: "none" }} name="files" id="file" type="file" multiple
                            onChange={(e) => updateList(e.target.value, e.target.name)} />
                        <div id="file-list">
                            {values.fileList.length ? (<div className="selected-file-wrapper">
                                {values.fileList.map((file, i) =>
                                    <div className="selected-file" key={i}>
                                        {file}
                                        <span onClick={() => deleteFile(file)}>
                                            <img src="/images/delete.svg" />
                                        </span>
                                    </div>
                                )}
                            </div>) : (<div className="selected-file">
                                No selected file
                            </div>)}
                            {
                                values.uploadWarning && <div className={'error'}>{values.uploadWarning}</div>
                            }
                        </div>
                    </div>
                    {
                        values.error && <div className={'error'}>{values.error}</div>
                    }
                    <button className="button round custom-width" onClick={handleSubmit}> Salveaza </button>
                </form>
            </div>
        </div>
    )
}


export default AdminData;
