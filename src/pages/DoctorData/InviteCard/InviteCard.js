import "./InviteCard.scss";

const renderBtn = (status) => {
    switch (status) {
        case "uninvited":
            return <div className={`button border-button round uninvited`}>Adaugă</div>
        case "waiting":
            return <div className={`button border-button round waiting`}>Invitație în așteptare</div>
        case "added":
            return <div className={`button border-button round added`}>Șterge</div>
    }
}

const InviteDoctorCard = (props) => {
    return (
        <div className="invited-doc-container">
            <div className="inv-doc">
                <img className="round-img" src={props.doctor.img || "/images/user.svg"} />
                <div className="info-container">
                    <div className="name">{props.doctor.name}</div>
                    <div className="specialities">
                        {props.doctor.specialities.map((spec, j) => {
                            return (
                                <span key={j}>{spec}</span>
                            )
                        })}
                    </div>
                    <div className="competences">
                        {props.doctor.competences.map((comp, k) => {
                            return (
                                <span key={k}>{comp}</span>
                            )
                        })}
                    </div>
                    <div className="unit">{props.doctor.unit}</div>
                    <div className="email">{props.doctor.email}</div>
                </div>
            </div>
            {renderBtn(props.doctor.status)}
        </div>)
}

const InviteUnitCard = (props) => {
    return (
        <div className="invited-doc-container">
            <div className="inv-doc">
                <img className="round-img" src={props.unit.img || "/images/user.svg"} />
                <div className="info-container">
                    <div className="name">{props.unit.name}</div>
                    <div className="type">{props.unit.type}</div>
                </div>
            </div>
            {renderBtn(props.unit.status)}
        </div>)
}

const InviteCard = (props) => {

    switch (props.type) {
        case "doctor":
            return InviteDoctorCard(props)
        case "unit":
            return InviteUnitCard(props)
    }
}

export default InviteCard;