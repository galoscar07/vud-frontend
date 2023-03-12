import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {logOutFromStorage} from "../../../utils/localStorage";

const LogOut = () => {
    const navigate = useNavigate()

    useEffect(() => {
        logOutFromStorage()
        navigate(routes.HOMEPAGE)
        window.location.reload()
    }, [])

    return (
      <div></div>
    )

}

export default LogOut;
