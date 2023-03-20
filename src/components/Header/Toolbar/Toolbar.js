import React from 'react'
import './Toolbar.scss'
import { NavLink } from "react-router-dom";
import { routes } from "../../../utils/routes";

function Toolbar() {

  return (
    <div className={'toolbar'}>
      <div className={'toolbar-items'}>
        <NavLink
          to={routes.DASHBOARD_PROFILE_DATA}
        >Administrare Date Profil</NavLink>
        <NavLink
          to={routes.DASHBOARD_UNIT_DATA}
        >Administrare Unitate Medicala</NavLink>
        <NavLink
          to={routes.LOG_OUT}
        >Delogheaza-te</NavLink>
        <NavLink
          to={routes.DELETE_PROFILE}
        >Sterge cont</NavLink>
      </div>
    </div>
  );
}

export default Toolbar;
