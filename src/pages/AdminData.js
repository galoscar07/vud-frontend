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
    const deleteFile = () => {
        console.log('ola')
    }

    const updateList = () => {
        let input = document.getElementById('file');
        let output = document.getElementById('file-list');
        let children = "";
        for (let i = 0; i < input.files.length; ++i) {
            children += '<div class="selected-file">' + input.files.item(i).name + '<span onclick=console.log("delete")>' + ' <img src="/images/delete.svg"/>' + ' </span>' + '</div>';
        }
        output.innerHTML = '<div class="selected-file-wrapper">' + children + '</div>';
    }

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
                                <input name='streetNo' type="text" value={values.streetNo}
                                       onChange={(e) => {
                                           handleFieldChange(e.target.value, 'streetNo');
                                       }}/>
                            </div>
                        </div>
                    </div>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                        their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                        their infancy. </p>
                    <div className="image-upload">
                        <label htmlFor="file">
                            <img
                                src="images/upload.svg"/>
                        </label>
                        <input style={{display: "none"}} id="file" type="file" multiple onChange=
                            {updateList}/>
                        <div id="file-list"></div>
                    </div>
                    <input className="button" type="submit" value="Mergi mai departe"/>
                </form>
            </div>
        </div>
    )
}


export default AdminData;
