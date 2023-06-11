import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import _ from "lodash";
import Dropdown from '../../components/Dropdown/Dropdown';
import { API_MAP, getAPILink, makeRequestLogged, routes } from "../../utils/routes";
import "./DoctorData.scss";
import InviteCard from "./InviteCard/InviteCard";
import { getAuthTokenFromLocal } from "../../utils/localStorage";

const DoctorData = (props) => {
    const navigate = useNavigate();

    // Form values
    const [values, setValues] = useState({
        firstName: props?.selected?.firstName || '',
        lastName: props?.selected?.lastName || '',
        phoneNo: props?.selected?.phoneNo || '',
        email: props?.selected?.email || '',
        website: props?.selected?.website || '',
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
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        phoneNo: false,
        email: false,
    })
    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
    };


    // Invited Doctors & Clinics
    const [errorInvite, setInviteError] = useState({
        // TODO handle properly
        name: false,
        email: false,
        unit: false,
        unitEmail: false,
    })
    const [inviteValues, setInviteValues] = useState({
        name: '',
        email: '',
        message: '',
        unit: '',
        unitEmail: '',
        unitMessage: ''
    })
    const invitedDoctors = [
        {
            name: "Mihai Dumitrescu",
            specialities: ["Spec1", "Spec2"],
            competences: ["Comp1", "Comp2"],
            unit: 'Unitate medicala',
            email: "test@emailc.com",
            img: "/images/user.svg",
            status: "uninvited"
        },
        {
            name: "Dorin Dumitrescu",
            specialities: ["Spec1", "Spec2"],
            competences: ["Comp1", "Comp2"],
            unit: 'Unitate medicala',
            email: "test@emailc.com",
            img: "/images/user.svg",
            status: "waiting"
        },
        {
            name: "Ana Dumitrescu",
            specialities: ["Spec1", "Spec2"],
            competences: ["Comp1", "Comp2"],
            unit: 'Unitate medicala',
            email: "test@emailc.com",
            img: "/images/user.svg",
            status: "added"
        }
    ]
    const invitedUnits = [{
        img: "/images/user.svg",
        name: "Clinica de pediatrie",
        type: "Clinica privata",
        status: "added"
    }]
    const [toggleInvite, setToggleInvite] = React.useState(false);
    const [toggleInviteU, setToggleInviteUnit] = React.useState(false);

    const toggleInviteDoctor = (toggleInvite) => {
        setToggleInvite(toggleInvite);
    }

    const toggleInviteUnit = (toggleInviteU) => {
        setToggleInviteUnit(toggleInviteU);
    }


    // Dropdowns
    const [selectedSpecialties, setSelectedSpecialties] = React.useState([]);
    const [selectedDegrees, setSelectedDegrees] = React.useState([]);
    const [selectedCompetences, setSelectedCompetences] = React.useState([]);
    const [academicDegreesDropDown, setAcademicDegreesDropDown] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [competences, setCompetences] = useState([])
    useEffect(() => {
        fetch(getAPILink(API_MAP.GET_ACADEMIC_DEGREES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setAcademicDegreesDropDown(mapped)
            })
            .catch((err) => { })
        fetch(getAPILink(API_MAP.GET_SPECIALITIES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setSpecialities(mapped)
            })
            .catch((err) => { })
        fetch(getAPILink(API_MAP.GET_COMPETENCES), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                const mapped = response.map((el) => { return { value: el.id, label: el.label } })
                setCompetences(mapped)
            })
            .catch((err) => { })
    }, [])
    const handleDropdownSubmit = (selected, name) => {
        switch (name) {
            case 'degree': {
                setSelectedDegrees(selected)
                break;
            }
            case 'speciality': {
                setSelectedSpecialties(selected)
                break;
            }
            case 'competences': {
                setSelectedCompetences(selected)
                break;
            }
        }
    }

    const [pagination, setPagination] = React.useState({
        perPage: 4,
        currentPage: 1,
        maxPage: null,
    })

    const [medics, setMedic] = useState('')

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
        if (selectedCompetences.length === 0 || selectedDegrees.length === 0 || selectedSpecialties.length === 0) {
            ok = false
        }
        setError(errorCopy)
        if (!ok) setValues({ ...values, error: "Va rugam sa completati campurile obligatorii" })
        if (!values.areTermsChecked) {
            setValues({ ...values, error: "Va rugam sa acceptati termenii si conditiile" })
        }
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

    const mapStateToObject = () => {
        return {
            // 1st card
            first_name: values.firstName,
            last_name: values.lastName,
            primary_phone: values.phoneNo,
            primary_email: values.email,
            website: values.website,
            website_facebook: values.facebook,
            website_google: values.google,
            website_linkedin: values.linkedin,
            website_youtube: values.youtube,
            whatsapp: values.whatsapp,
            // 2nd card
            description: values.description,
            // 3rd card
            academic_degree: selectedDegrees.map(el => { return el.value }),
            speciality: selectedSpecialties.map(el => { return el.value }),
            medical_skill: selectedCompetences.map(el => { return el.value }),
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // TODO check form
        if (!isFormValid()) return
        if (props.onSubmit) {
            // TODO Finish this for the dashboard
            props.onSubmit(mapStateToObject())
        } else {
            const mapped = mapStateToObject()
            const formData = new FormData()
            formData.append('first_name', mapped.first_name)
            formData.append('last_name', mapped.last_name)
            formData.append('primary_phone', mapped.primary_phone)
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

            // TODO Finish file sending
            // formData.append('file1', files[0])
            // formData.append('file2', files[1])

            makeRequestLogged(
                getAPILink(API_MAP.PUT_DOCTOR_PROFILE),
                'PUT',
                formData,
                getAuthTokenFromLocal(),
                'multipart/form-data'
            ).then((response) => response.json())
                .then((resp) => {
                    if (resp.success === 'Success') {
                        if (resp.success) navigate(routes.THANK_YOU)
                    } else {
                        setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
                    }
                })
                .catch((err) => {
                    setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
                })
        }
        debugger
        console.log('submitted')
    }
    const inviteDoctor = () => {
        console.log('invite')
    }
    const inviteUnit = () => {
        console.log('invite')
    }

    return (
        <div className="doctor-data-page">
            <img src="/images/user.svg" />
            <h1>Profil medic</h1>
            <div className="data-container">
                <form>
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
                                    <input name="website" type="text" value={values.website}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="input-wrapper">
                                    <label>Profil Facebook</label>
                                    <input name="facebook" type="text" value={values.facebook}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Google</label>
                                    <input name="google" type="text" value={values.google}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Profil Linkedin</label>
                                    <input name="linkedin" type="text" value={values.linkedin}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Youtube</label>
                                    <input name="youtube" type="text" value={values.youtube}
                                        onChange={(e) => {
                                            handleFieldChange(e.target.value, e.target.name);
                                        }} />
                                </div>
                                <div className="input-wrapper">
                                    <label>Whatsapp</label>
                                    <input name="whatsapp" type="text" value={values.whatsapp}
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
                            <textarea maxLength='500' rows="15" className="full-width" type="comment" name="description" value={values.description}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                            <div className="counter"> {values.description.length} / 500 </div>
                            <div className="col-2">
                                <Dropdown selected={selectedDegrees} options={academicDegreesDropDown} title={"*Grad medical"} onSelect={(e) => handleDropdownSubmit(e, 'degree')} />
                                <Dropdown selected={selectedSpecialties} options={specialities} title={"*Specialitate"} onSelect={(e) => handleDropdownSubmit(e, 'speciality')} />
                            </div>
                            <div className="col">
                                <Dropdown selected={selectedCompetences} options={competences} title={"*Competente"} onSelect={(e) => handleDropdownSubmit(e, 'competences')} />
                            </div>
                        </div>
                    </div>
                    {/*<div className="collab-unit-data">*/}
                    {/*    <div className="container-title">Unitate medicală colaboratoare</div>*/}
                    {/*    <div className="fields-wrapper">*/}
                    {/*        /!* <input onChange={handleInput} className="search" value={medic} type="text" placeholder="Cauta medic" name="name" /> *!/*/}

                    {/*        /!* dropdown *!/*/}
                    {/*        {invitedUnits.map((invited, i) => {*/}
                    {/*            return (*/}
                    {/*                <InviteCard type="unit" unit={invited} />*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*        {!toggleInviteU && <div className={`button border-button round invite-btn`} onClick={() => toggleInviteUnit(true)}>Invitați unitate medicală pe vreaudoctor.ro</div>}*/}

                    {/*        {toggleInviteU && <div className="invite-container">*/}
                    {/*            <div className="container-subtitle">*/}
                    {/*                <span className="container-title">Invitați unitate medicala</span>*/}
                    {/*                <span className="close" onClick={() => toggleInviteUnit(false)}>x</span>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-1">*/}
                    {/*                <div className="input-wrapper">*/}
                    {/*                    <label>*Nume unitate medicala</label>*/}
                    {/*                    <input className={errorInvite.unit ? 'error' : ''} name="unit" type="text" value={inviteValues.unit}*/}
                    {/*                        onChange={(e) => {*/}
                    {/*                            handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                        }} />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-1">*/}
                    {/*                <div className="input-wrapper">*/}
                    {/*                    <label>*Adresa email</label>*/}
                    {/*                    <input className={errorInvite.unitEmail ? 'error' : ''} name="unitEmail" type="text" value={inviteValues.unitEmail}*/}
                    {/*                        onChange={(e) => {*/}
                    {/*                            handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                        }} />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="textarea-column">*/}
                    {/*                <label>Personalizeaza mesaj</label>*/}
                    {/*                <textarea rows="15" className="full-width" type="comment" name="unitMessage" value={inviteValues.unitMessage}*/}
                    {/*                    onChange={(e) => {*/}
                    {/*                        handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                    }} />*/}
                    {/*            </div>*/}
                    {/*            <div className="button round custom-width" onClick={inviteUnit}> Trimiteți invitație </div>*/}
                    {/*        </div>}*/}
                    {/*        /!* medici invitati *!/*/}
                    {/*        /!* medici adaugati *!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="collab-doctors-data">*/}
                    {/*    <div className="container-title">Medici colaboratoari</div>*/}
                    {/*    <div className="fields-wrapper">*/}
                    {/*        /!* <input onChange={handleInput} className="search" value={medic} type="text" placeholder="Cauta medic" name="name" /> *!/*/}

                    {/*        /!* dropdown *!/*/}

                    {/*        {invitedDoctors.map((invited, i) => {*/}
                    {/*            return (*/}
                    {/*                <InviteCard type="doctor" doctor={invited} />*/}
                    {/*            )*/}
                    {/*        })}*/}


                    {/*        {!toggleInvite && <div className={`button border-button round invite-btn`} onClick={() => toggleInviteDoctor(true)}>Invitați medic pe vreaudoctor.ro</div>}*/}

                    {/*        {toggleInvite && <div className="invite-container">*/}
                    {/*            <div className="container-subtitle">*/}
                    {/*                <span className="container-title">Invitați medic</span>*/}
                    {/*                <span className="close" onClick={() => toggleInviteDoctor(false)}>x</span>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-1">*/}
                    {/*                <div className="input-wrapper">*/}
                    {/*                    <label>*Nume medic</label>*/}
                    {/*                    <input className={errorInvite.name ? 'error' : ''} name="name" type="text" value={inviteValues.name}*/}
                    {/*                        onChange={(e) => {*/}
                    {/*                            handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                        }} />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-1">*/}
                    {/*                <div className="input-wrapper">*/}
                    {/*                    <label>*Adresa email</label>*/}
                    {/*                    <input className={errorInvite.email ? 'error' : ''} name="email" type="text" value={inviteValues.email}*/}
                    {/*                        onChange={(e) => {*/}
                    {/*                            handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                        }} />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="textarea-column">*/}
                    {/*                <label>Personalizeaza mesaj</label>*/}
                    {/*                <textarea rows="15" className="full-width" type="comment" name="message" value={inviteValues.message}*/}
                    {/*                    onChange={(e) => {*/}
                    {/*                        handleFieldChange(e.target.value, e.target.name);*/}
                    {/*                    }} />*/}
                    {/*            </div>*/}
                    {/*            <div className="button round custom-width" onClick={inviteDoctor}> Trimiteți invitație </div>*/}
                    {/*        </div>}*/}
                    {/*        /!* medici invitati *!/*/}
                    {/*        /!* medici adaugati *!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="file-data-doc">
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
                        <div className="checkbox-container">
                            <label><a className="terms-hyper" href={routes.TERMS_AND_CONDITION} target={'_blank'} rel="noreferrer">Termeni si conditii de abonare</a></label>
                            <div className="checkbox-wrapper">
                                <input className="checkbox" type="checkbox" value={values.areTermsChecked}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                            </div>
                        </div>
                    </div>
                    <button className="button round custom-width" onClick={handleSubmit}> Salveaza </button>
                </form>
            </div>
        </div>
    )
}
export default DoctorData;
