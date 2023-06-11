import React, {useEffect} from 'react'
import "./HowToRedeem.scss"
import {API_MAP, getAPILink, routes} from "../../utils/routes";
import _ from "lodash";
import {useNavigate} from "react-router-dom";

const RedeemDoctorPage = () => {

    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        message: '',
        job: '',
        fileList: [],
        doctor_id: '',
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
        doctor_id: false,
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
        if (!ok) setValues({...values, error: "Va rugam sa completati campurile obligatorii"})
        return ok
    }

    useEffect(() => {
        setValues({...values, doctor_id: new URLSearchParams(window.location.search).get('id')})
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
        formData.append('doctor_id', values.doctor_id)
        let files = []
        let input = document.getElementById('file');
        for (let i = 0; i < input.files.length; ++i) {
            if (i < 3) {
                files.push(input.files.item(i))
            }
        }
        formData.append('file1', files[0])
        formData.append('file2', files[1])
        fetch(getAPILink(API_MAP.POST_REDEEM_DOCTOR), {
            method: "POST",
            body: formData,
        }).then((response) => response.json())
          .then((resp) => {
              if (resp.success) {
                  navigate(routes.THANK_YOU)
              } else {
                  setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
              }
          })
          .catch((err) => {
              debugger
              setValues({ ...values, error: "A aparut o eraore. Va rugam incercati din nou" })
          })
    }
    return (
        <div className="how-to-redeem-page">
                <img alt={'User icon'} src="/images/user.svg" />
            <div className="container-title">Cum sa revendici contul paginii de profil a unui doctor pe vreauundoctor.ro:</div>
            <div className="info-container">
                <div className="steps">
                    <ol>
                        <li>Acceseaza pagina de profil a doctorului si apasa pe butonul "Revendica profilul".</li>
                        <li>Completeaza formularul de mai jos cu datele de contact.</li>
                        <li>Pentru a dovedi ca esti reprezentantul legal, va trebui sa furnizezi documente justificative.</li>
                        <li>Dupa ce documentele justificative au fost verificate si aprobate, vei primi un email de confirmare ca revendicarea profilului a fost facuta cu succes si vei putea sa editezi si sa actualizezi informatiile de pe pagina de profil a doctorului accesand link-ul din continutul email-ului.</li>
                        <li> Daca revendicarea profilului nu a fost aprobata, vei primi un email informativ ca revendicarea nu a fost acceptata si care va contine si posibile motive pentru aceasta decizie.</li>
                    </ol>

                    <span className="bold">In concluzie, revendicarea contului paginii de profil a doctorului pe vreauundoctor.ro este un proces simplu si rapid, care iti poate aduce multiple beneficii, cum ar fi cresterea vizibilitatii si a numarului de pacienti.
                        Asadar, nu ezita sa urmezi acesti pasi pentru a-ti revendica contul!</span>
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
                            <label>*Functie</label>
                            <input name="job" type="text" value={values.job}
                                   className={error.job ? 'error' : ''}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                        </div>
                        <div className="input-wrapper">
                            <label>Mesaj (optional)</label>
                            <input name="message" type="text" value={values.message}
                                onChange={(e) => {
                                    handleFieldChange(e.target.value, e.target.name);
                                }} />
                        </div>
                    </div>
                </div>
                <p className="italic">
                    Pentru a ne asigura ca actionati in numele entitatii a carei pagina o completati/recuperati,
                    va rugam sa parcurgeti pasii de identificare si confirmare:Incarcati o copie a CUI Incarcati
                    un document care sa ateste ca actionati in numele societatii al carui CUI l-ati incarcat
                    (certificat constatator din care sa reiasa ca sunteti administrator sau un document de
                    imputernicire din partea administratorului societatii – puteti folosi
                    <a href={routes.EXAMPLE_COMPLETE} target={"_blank"} rel="noreferrer">urmatorul model</a>
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
                            No selected file
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
                    <label><a href={routes.TERMS_AND_CONDITION} rel="noreferrer" target={'_blank'}>Termeni si conditii</a></label>
                </div>
                {
                    values.error && <div style={{marginBottom: '15px'}} className={'error'}>{values.error}</div>
                }

                <button className="button round custom-width" onClick={handleSubmit}> Trimite formular </button>

            </form>
        </div>
    );
}


export default RedeemDoctorPage;
