import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import _ from "lodash";
import Dropdown from '../../components/Dropdown/Dropdown';
import { API_MAP, getAPILink, routes } from "../../utils/routes";

const DoctorData = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        phoneNo: false,
        email: false,
        //tba

    })

    const [errorInvite, setInviteError] = useState({
        name: false,
        email: false
    })

    const [values, setValues] = useState({
        firstName: props?.selected?.firstName || '',
        lastName: props?.selected?.lastName || '',
        phoneNo: props?.selected?.phoneNo || '',
        email: props?.selected?.email || '',
        facebook: props?.selected?.facebook || '',
        google: props?.selected?.google || '',
        linkedin: props?.selected?.linkedin || '',
        youtube: props?.selected?.youtube || '',
        whatsapp: props?.selected?.whatsapp || '',
        description: props?.selected?.description || '',
        medical_degree: props?.selected?.medical_degree || '',
        speciality: props?.selected?.speciality || '',
        fileList: props?.selected?.fileList || [],
        files: props?.selected?.files || [],
        error: '',
        uploadWarning: '',
        areTermsChecked: false,
    })

    const [inviteValues, setInviteValues] = useState({
        name: '',
        email: '',
        message: ''
    })

    const academicDegreesDropDown = ['one', 'two', 'three']
    const specialityDropDown = ['one', 'two', 'three']
    const [selectedSpecialties, setSelectedSpecialties] = React.useState([]);
    const [selectedDegrees, setSelectedDegrees] = React.useState([]);


    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
    };

    const isFormValid = () => {
        let errorCopy = _.cloneDeep(error)
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
        setError(errorCopy)
        if (!ok) setValues({ ...values, error: "Va rugam sa completati campurile obligatorii" })
        return ok
    }

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
    const handleSubmit = (event) => {
        console.log('submitted')
    }
    const handleSubmitDegrees = (selected) => {
        console.log('degrees')
    }
    const handleSubmitSpeciality = (selected) => {
        console.log('spec')
    }
    const inviteDoctor = () => {
        console.log('invite')
    }


    return (
        <div className="doctor-data-page">
            <div className="data-container">
                <img src="/images/user.svg" />
                <h1>Profil medic</h1>
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
                            <div className="col-3-1">
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
                                <div className="input-wrapper">
                                    <label>Website</label>
                                    <input className={error.website ? 'error' : ''} name="website" type="text" value={values.website}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="input-wrapper">
                                    <label>Profil Facebook</label>
                                    <input className={error.facebook ? 'error' : ''} name="facebook" type="text" value={values.facebook}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Google</label>
                                    <input className={error.google ? 'error' : ''} name="google" type="text" value={values.google}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Linkedin</label>
                                    <input className={error.linkedin ? 'error' : ''} name="linkedin" type="text" value={values.linkedin}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Youtube</label>
                                    <input className={error.youtube ? 'error' : ''} name="youtube" type="text" value={values.youtube}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Whatsapp</label>
                                    <input className={error.whatsapp ? 'error' : ''} name="whatsapp" type="text" value={values.whatsapp}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description-data">
                        <div className="container-title">Descriere Personla</div>
                        <div className="fields-wrapper">
                            <textarea rows="6" className="full-width" type="comment" name="description" value={values.description}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                            <div className="col-2">
                                <Dropdown selected={selectedDegrees} options={academicDegreesDropDown} title={"*Grad medical"} onSelect={handleSubmitDegrees} />
                                <Dropdown selected={selectedSpecialties} options={specialityDropDown} title={"*Specialitate"} onSelect={handleSubmitSpeciality} />
                            </div>
                        </div>
                    </div>
                    <div className="collab-unit-data">
                        <div className="container-title">Unitate medicală colaboratoare</div>

                    </div>
                    <div className="collab-doctos-data">
                        <div className="container-title">Medici colaboratoari</div>
                        <div className="fields-wrapper">
                            {/* dropdown */}
                            {/* list */}
                            <div className="invite-container">
                                <div className="container-subtitle">Invitați medic</div>
                                <div className="col-1">
                                    <div className="input-wrapper">
                                        <label>*Nume medic</label>
                                        <input className={errorInvite.name ? 'error' : ''} name="name" type="text" value={inviteValues.name}
                                            onChange={(e) => {
                                                handleFieldChange(e.target.value, e.target.name);
                                            }} />
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="input-wrapper">
                                        <label>*Adresa email</label>
                                        <input className={errorInvite.email ? 'error' : ''} name="email" type="text" value={inviteValues.email}
                                            onChange={(e) => {
                                                handleFieldChange(e.target.value, e.target.name);
                                            }} />
                                    </div>
                                </div>
                                <textarea rows="6" className="full-width" type="comment" name="message" value={inviteValues.message}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                                <button className="button round custom-width" onClick={inviteDoctor}> Trimiteți invitație </button>
                            </div>
                            {/* medici invitati */}
                            {/* medici adaugati */}
                        </div>
                    </div>
                    <div className="file-data">
                        <p className="italic">
                            Pentru a ne asigura că sunteți titularul legitim al datelor medicale înregistrate, vă rugăm să urmați pașii de identificare și confirmare următori:
                            - Încărcați o copie a diplomei de medic sau a certificatului de înregistrare la Colegiul Medicilor.
                            - Încărcați o copie a buletinului de identitate sau a altui document de identificare oficial.
                            Acești pași sunt necesari pentru a ne asigura că datele medicale înregistrate sunt autentice și că vă puteți gestiona cu succes pagina personală pe care ați înregistrat datele medicale.
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
                                    No selected file
                                </div>)}
                                {
                                    (values.uploadWarning || error.fileList) && <div className={'error'}>{values.uploadWarning}</div>
                                }
                            </div>

                        </div>
                        {
                            values.error && <div style={{ marginBottom: '15px' }} className={'error'}>{values.error}</div>
                        }
                    </div>
                    <div className="checkbox-container">

                        <label><a className="terms-hyper" href={routes.TERMS_AND_CONDITION} target={'_blank'} rel="noreferrer">Termeni si conditii de abonare</a></label>
                        <div className="checkbox-wrapper">
                            <input className="checkbox" type="checkbox" value={values.areTermsChecked}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                        </div>

                    </div>
                    <button className="button round custom-width" onClick={handleSubmit}> Salveaza </button>

                </form>
            </div>
        </div>
    )
}
export default DoctorData;