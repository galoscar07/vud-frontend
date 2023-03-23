import React, { useState } from 'react'
import "./HowToRedeem.scss"

const HowToRedeemPage = () => {

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        message: '',
        job: '',
        fileList: [],
        areTermsChecked: false,
        uploadWarning: '',
        error: '',
    });
    
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
        //TODO submit; 
        event.preventDefault();
    }
    return (
        <div className="how-to-redeem-page">
                <img src="/images/user.svg" />
            <div className="container-title">Cum sa revendici contul paginii de profil a unitatii medicale pe vreauundoctor.ro:</div>
            <div className="info-container">
                <div className="steps">
                    <ol>
                        <li>    Acceseaza pagina de profil a unitatii medicale si apasa pe butonul "Revendica profilul".</li>
                        <li> Completeaza formularul de mai jos cu datele de contact.</li>
                        <li>Pentru a dovedi ca esti reprezentantul legal al unitatii medicale, va trebui sa furnizezi documente justificative.</li>
                        <li>Dupa ce documentele justificative au fost verificate si aprobate, vei primi un email de confirmare ca revendicarea profilului a fost facuta cu succes si vei putea sa editezi si sa actualizezi informatiile de pe pagina de profil a unitatii medicale accesand link-ul din continutul email-ului.</li>
                        <li> Daca revendicarea profilului nu a fost aprobata, vei primi un email informativ ca revendicarea nu a fost acceptata si care va contine si posibile motive pentru aceasta decizie.</li>
                    </ol>

                    <span className="bold">In concluzie, revendicarea contului paginii de profil a unitatii medicale pe vreauundoctor.ro este un proces simplu si rapid, care iti poate aduce multiple beneficii, cum ar fi cresterea vizibilitatii si a numarului de pacienti.
                        Asadar, nu ezita sa urmezi acesti pasi pentru a-ti revendica contul si pentru a-ti promova cu succes unitatea medicala!</span>
                </div>
            </div>
            <form>
                <div className="contact-data">
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
                        <div className="input-wrapper">
                            <label>Functie</label>
                            <input name="job" type="text" value={values.emajobil}
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
                <div className="terms">
                    <div className="checkbox-wrapper">
                        <input className="checkbox" type="checkbox" value={values.areTermsChecked}
                            onChange={(e) => handleFieldChange(e.target.value, e.target.name)} />
                    </div>
                    <label><a>Termeni si conditii</a></label>
                </div>
                {
                    values.error && <div className={'error'}>{values.error}</div>
                }

                <button className="button round custom-width" onClick={handleSubmit}> Trimite formular </button>

            </form>
        </div>
    );
}


export default HowToRedeemPage;
