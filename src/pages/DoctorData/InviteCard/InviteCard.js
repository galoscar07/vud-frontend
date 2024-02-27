import "./InviteCard.scss";

const renderBtn = (status, onClick) => {
    switch (status) {
        case "uninvited":
            return <div onClick={onClick} className={`button border-button round uninvited`}>Adaugă</div>
        case "waiting":
            return <div onClick={onClick}  className={`button border-button round waiting disabled`}>Invitație în așteptare</div>
        case "added":
            return <div onClick={onClick}  className={`button border-button round added`}>Șterge</div>
        default:
            return null
    }
}

const InviteDoctorCard = (props) => {
    return (
        <div className="invited-doc-container" style={{ opacity: props.doctor.disabled ? '0.5' : '1', pointerEvents: props.doctor.disabled ? 'none' : 'auto'}}>
            <div className="inv-doc">
                <img className="round-img" alt="user icon" src={props.doctor.img || "/images/user.svg"} />
                <div className="info-container">
                    <div className="name">{props.doctor.name}</div>
                    <div className="specialities">
                        {props.doctor?.specialities?.map((spec, j) => {
                            return (
                                <span key={j}>{spec}</span>
                            )
                        })}
                    </div>
                    <div className="competences">
                        {props.doctor?.competences?.map((comp, k) => {
                            return (
                                <span key={k}>{comp}</span>
                            )
                        })}
                    </div>
                    <div className="unit">{props.doctor?.unit}</div>
                    <div className="email">{props.doctor?.email}</div>
                </div>
            </div>
            {renderBtn(props.doctor?.status, () => {props.onClick(props.doctor)})}
        </div>)
}

const InviteUnitCard = (props) => {
    return (
        <div className="invited-doc-container" style={{ opacity: props.unit.disabled ? '0.5' : '1', pointerEvents: props.unit.disabled ? 'none' : 'auto'}}>
            <div className="inv-doc">
                <img className="round-img" alt="user icon" src={props.unit.img || "/images/user.svg"} />
                <div className="info-container">
                    <div className="name">{props.unit.name}</div>
                    <div className="type">{props.unit.type}</div>
                </div>
            </div>
            {renderBtn(props.unit.status, () => {props.onClick(props.unit)})}
        </div>)
}

const InviteCard = (props) => {
    if (props === null || props === undefined) {
        return null
    }

    switch (props.type) {
        case "doctor":
            return InviteDoctorCard(props)
        case "unit":
            return InviteUnitCard(props)
        default:
            return null
    }
}

export default InviteCard;
