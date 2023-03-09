import React, { useEffect, useState } from 'react'
import './Toolbar.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";

function Toolbar() {
  const navigate = useNavigate();



  return (
    <div className={'toolbar'}>
      <div className={'toolbar-items'}>
        <NavLink
          to={routes.HOMEPAGE}
        // onClick={() => toggleMenu(false)}
        >Administrare Date Profil</NavLink>
        <NavLink
          to={routes.MEDICAL_INFO}
        // onClick={() => toggleMenu(false)}
        >Date administrator</NavLink>
        <NavLink
          to={routes.CHARITY}
        // onClick={() => toggleMenu(false)}
        >Administrare Unitate Medicala</NavLink>

      </div>
    </div>
  );
}

export default Toolbar;
