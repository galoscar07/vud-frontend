import React, { useEffect, useState } from 'react'
import "./AdminData.scss"
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import { getAuthTokenFromLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import _, { update } from "lodash";
import {JUD_ORA} from "../../utils/judete";
import Dropdown from '../../components/Dropdown/Dropdown';

const AdminData = (props) => {
    const navigate = useNavigate();
    const judete = JUD_ORA.judete.map((el)=> {return {value: el.auto, label: el.nume}})

    const [formValid, setFormValid] = React.useState(false)

    const [error, setError] = React.useState({
        firstName: false,
        lastName: false,
        phoneNo: false,
        email: false,
        company: false,
        position: false,
        streetNo: false,
        street: false,
        fileList: false,
    })

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
        county: props?.selected?.county || '',
        town: props?.selected?.town || '',
        fileList: props?.selected?.fileList || [],
        files: props?.selected?.files || [],
        error: '',
        uploadWarning: ''
    });

    const [cities, setCities] = React.useState([])

    const [errorStateDD, setErrorStateDD] = useState({
        town: false,
        county: false,
    })

    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
    };

    const isFormValid = () => {
        let errorCopy = _.cloneDeep(error)
        let errorCopyDD = _.cloneDeep(errorStateDD)

        Object.keys(errorStateDD).forEach((key) => {
            errorCopy[key] = false;
        })

        let ok = true
        Object.keys(error).forEach((key) => {
            if (key === 'fileList') {
                errorCopy[key] = values[key].length === 0
            } else {
                errorCopy[key] = !values[key]
            }
            if (!values[key]) {
                ok = false
            }
        })

        if (values.town.length === 0) {
            ok = false
            errorCopyDD.town = true;
        } else errorCopyDD.town = false;
        if (values.county.length === 0) {
            ok = false
            errorCopyDD.county = true;
        } else errorCopyDD.county = false;

        setError(errorCopy)
        setErrorStateDD(errorCopyDD)
        if (!ok) setValues({ ...values, error: "Va rugăm să completați câmpurile obligatorii" })
        return ok
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) return
        if (props.onSubmit) {
            props.onSubmit(values)
        } else {
            const formData = new FormData()
            formData.append('first_name', values.firstName)
            formData.append('last_name', values.lastName)
            formData.append('phone_number', values.phoneNo)
            formData.append('contact_email', values.email)
            formData.append('phone_number_optional', values.phoneNoOpt)
            formData.append('contact_email_optional', values.emailOpt)
            formData.append('company', values.company)
            formData.append('company_role', values.position)
            formData.append('county', values.county)
            formData.append('town', values.town)
            formData.append('street', values.street)
            formData.append('street_number', values.streetNo)
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
                        localStorage.setItem('user', JSON.stringify({ is_visible: false, step: '3' }))
                        navigate(routes.ADD_UNIT)
                    } else {
                        setValues({ ...values, error: "A apărut o eraore. Va rugăm încercați din nou" })
                    }
                })
                .catch((err) => {
                    setValues({ ...values, error: "A apărut o eraore. Va rugăm încercați din nou" })
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
                setValues({ ...values, uploadWarning: "Va rugăm adăugați maxim 2 fișiere." })
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

    const getCitiesForCounty = (val)=>{
        handleFieldChange(val, 'county')
        const found = JUD_ORA.judete.filter((sd) => sd.auto === val.value)
        if (found.length > 0) {
            const mapped = found[0].localitati.map((loc) => {return {value: loc.nume, label: loc.nume}})
            setCities(mapped)
        }
        handleFieldChange(val.label,'county');
    }
    const setCity = (val) =>{
        handleFieldChange(val.value, 'town');
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
                                    <input className={error.lastName ? 'error' : ''} name="lastName" type="text" value={values.lastName}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>*Prenume</label>
                                    <input className={error.firstName ? 'error' : ''} name="firstName" type="text" value={values.firstName}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>*Telefon</label>
                                    <input className={error.phoneNo ? 'error' : ''} name="phoneNo" type="text" value={values.phoneNo}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>*Email de contact</label>
                                    <input className={error.email ? 'error' : ''} name="email" type="text" value={values.email}
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
                                    <label>*Funcția</label>
                                    <input className={error.position ? 'error' : ''} name="position" type="text" value={values.position}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>*Compania</label>
                                    <input className={error.company ? 'error' : ''} name="company" type="text" value={values.company}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="input-wrapper">
                                    <Dropdown hasError={errorStateDD.county} noNumber title={"Judet*"} onSelect={getCitiesForCounty} options={judete} isMulti={false}/>
                                </div>
                                <div className="input-wrapper">
                                    <Dropdown hasError={errorStateDD.town} noNumber title={"Oras*"} onSelect={setCity} options={cities} isMulti={false}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-wrapper">
                                    <label>*Strada</label>
                                    <input className={error.street ? 'error' : ''} name="street" type="text" value={values.street}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>*Numărul</label>
                                    <input className={error.streetNo ? 'error' : ''} name='streetNo' type="text" value={values.streetNo}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="italic">
                    Pentru a ne asigura că acționați în numele entității a cărei pagină o completați/recuperați,
                        va rugăm să parcurgeți pașii de identificare și confirmare:Încărcați o copie a CUI Încărcați
                        un document care să ateste că acționați în numele societății al cărui CUI l-ați încărcat
                        (certificat constatator din care să reiasă că sunteți administrator sau un document de
                        împuternicire din partea administratorului societății – puteți folosi
                        <a href={routes.EXAMPLE_COMPLETE} target={"_blank"}>următorul model</a>
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
                            </div>) : (<div className={`selected-file ${error.fileList ? 'error' : ''}`}>
                               Niciun fișier selectat
                            </div>)}
                            {
                                (values.uploadWarning || error.fileList) && <div className={'error'}>{values.uploadWarning}</div>
                            }
                        </div>
                    </div>
                    {
                        values.error && <div style={{ marginBottom: '15px' }} className={'error'}>{values.error}</div>
                    }
                    <button className="button round custom-width" onClick={handleSubmit}> Salvează </button>
                </form>
            </div>
        </div>
    )
}

export default AdminData;
