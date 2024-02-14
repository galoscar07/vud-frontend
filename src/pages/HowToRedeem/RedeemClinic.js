import React, {useEffect} from 'react'
import "./HowToRedeem.scss"
import {API_MAP, getAPILink, routes} from "../../utils/routes";
import _ from "lodash";
import {useNavigate} from "react-router-dom";

const RedeemClinicPage = () => {

    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        message: '',
        job: '',
        fileList: [],
        clinic_id: '',
        areTermsChecked: false,
        uploadWarning: '',
        error: '',
    });

    const [error, setError] = React.useState({
        firstName: false,
        lastName: false,
        phoneNo: false,
        email: false,
        job: false,
        fileList: false,
        clinic_id: false,
    });

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
        if (!ok) setValues({...values, error: "Va rugăm să completați câmpurile obligatorii"})
        return ok
    }

    useEffect(() => {
        setValues({...values, clinic_id: new URLSearchParams(window.location.search).get('id')})
    }, [])
    
    const handleFieldChange = (value, title) => {
        setValues((prevState) => ({ ...prevState, [title]: value }));
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
                setValues({ ...values, uploadWarning: "Va rugăm adăugați maxim 2 fișiere" })
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
        setValues({ ...values, fileList: updatedList })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) return
        const formData = new FormData()
        formData.append('first_name', values.firstName)
        formData.append('last_name', values.lastName)
        formData.append('email', values.email)
        formData.append('phone', values.phoneNo)
        formData.append('company_role', values.job)
        formData.append('message', values.message)
        formData.append('clinic_id', values.clinic_id)
        let files = document.getElementById('file').files;
        formData.append('file1', files[0])
        formData.append('file2', files[1])
        fetch(getAPILink(API_MAP.POST_REDEEM_CLINIC), {
            method: "POST",
            body: formData,
        }).then((response) => response.json())
          .then((resp) => {
              if (resp.success) {
                  navigate(routes.THANK_YOU)
              } else {
                  setValues({ ...values, error: "A apărut o eraore. Va rugăm încercați din nou" })
              }
          })
          .catch((err) => {
              setValues({ ...values, error: "A apărut o eraore. Va rugăm încercați din nou" })
          })
    }
    return (
        <div className="how-to-redeem-page">
                <img alt={'User icon'} src="/images/user.svg" />
            <div className="container-title">Cum să revendici contul paginii de profil a unității medicale pe vreauundoctor.ro:</div>
            <div className="info-container">
            <div className="steps">
                    <ol>
                        <li>Accesează pagină de profil a unității medicale și apasă pe butonul "Revendică profilul".</li>
                        <li>Completează formularul de mai jos cu datele de contact.</li>
                        <li>Pentru a dovedi că eșți reprezentantul legal al unității medicale, va trebui să furnizezi documente justificative.</li>
                        <li>După ce documentele justificative au fost verificate și aprobate, vei primi un email de confirmare că revendicarea profilului a fost făcută cu succes și vei putea să editezi și să actualizezi informațiile de pe pagină de profil a unității medicale accesând link-ul din conținutul email-ului.</li>
                        <li> Dacă revendicarea profilului nu a fost aprobată, vei primi un email informativ că revendicarea nu a fost acceptată și care va conține și posibile motive pentru această decizie.</li>
                    </ol>

                    <span className="bold">În concluzie, revendicarea contului paginii de profil a unității medicale pe vreauundoctor.ro este un proces simplu și rapid, care îți poate aduce multiple beneficii, cum ar fi creșterea vizibilității și a numărului de pacienți.
                        Așadar, nu ezită să urmezi aceșți pași pentru a-ți revendică contul și pentru a-ti promova cu succes unitatea medicală!</span>
                </div>
            </div>
            <form>
                <div className="contact-data">
                    <div className="fields-wrapper">
                        <div className="col-2">
                            <div className="input-wrapper">
                                <label>*Nume</label>
                                <input name="lastName" type="text" value={values.lastName}
                                       className={error.lastName ? 'error' : ''}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                            </div>
                            <div className="input-wrapper">
                                <label>*Prenume</label>
                                <input name="firstName" type="text" value={values.firstName}
                                       className={error.firstName ? 'error' : ''}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="input-wrapper">
                                <label>*Telefon</label>
                                <input name="phoneNo" type="text" value={values.phoneNo}
                                       className={error.phoneNo ? 'error' : ''}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                            </div>
                            <div className="input-wrapper">
                                <label>*Email de contact</label>
                                <input name="email" type="text" value={values.email}
                                       className={error.email ? 'error' : ''}
                                    onChange={(e) => {
                                        handleFieldChange(e.target.value, e.target.name);
                                    }} />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label>*Funcție</label>
                            <input name="job" type="text" value={values.job}
                                   className={error.job ? 'error' : ''}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                        </div>
                        <div className="input-wrapper">
                            <label>Mesaj (opțional)</label>
                            <input name="message" type="text" value={values.message}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                        </div>
                    </div>
                </div>
                <p className="italic">
                    Pentru a ne asigura că acționați în numele entității a cărei pagină o completați/recuperați,
                    va rugăm să parcurgeți pașii de identificare și confirmare:Încărcați o copie a CUI Încărcați
                    un document care să ateste că acționați în numele societății al cărui CUI l-ați încărcat
                    (certificat constatator din care să reiasă că sunteți administrator sau un document de
                    împuternicire din partea administratorului societății – puteți folosi
                    <a href={routes.EXAMPLE_COMPLETE} target={"_blank"} rel="noreferrer">următorul model</a>
                </p>
                <div className="image-upload">
                    <label htmlFor="file">
                        <img alt="upload icon for files" className="upload-photo"
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
                                        <img alt='Delete icon' src="/images/delete.svg" />
                                    </span>
                                </div>
                            )}
                        </div>) : (<div className={`selected-file  ${error.fileList ? 'error' : ''}`}>
                        Niciun fișier selectat                
                                </div>)}
                        {
                            values.uploadWarning && <div className={'error'}>{values.uploadWarning}</div>
                        }
                    </div>
                </div>
                <div className="terms">
                    <div className="checkbox-wrapper">
                        <input className="checkbox" type="checkbox" value={values.areTermsChecked}
                            onChange={(e) => handleFieldChange(e.target.value, e.target.name)} />
                    </div>
                    <label><a href={routes.TERMS_AND_CONDITION} rel="noreferrer" target={'_blank'}>Termeni și condiții</a></label>
                </div>
                {
                    values.error && <div style={{marginBottom: '15px'}} className={'error'}>{values.error}</div>
                }

                <button className="button round custom-width" onClick={handleSubmit}> Trimite formular </button>

            </form>
        </div>
    );
}


export default RedeemClinicPage;
