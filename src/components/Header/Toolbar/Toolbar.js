import React, { useEffect } from 'react'
import './Toolbar.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";

const toolbarValues = [
  {
    text: "Administrare Date Profil",
    value: "profile-data"
  },
  {
    text: "Date administrator",
    value: "admin-data"
  },
  {
    text: "Administrare Unitate Medicala",
    value: "unit-data"
  },
]

function Toolbar() {
  let url = window.location.toString()
  let currentlyActive = url.split("dashboard/")[1];
  console.log(currentlyActive, 'CURR')
  const [activeLink, setActive] = React.useState(currentlyActive);
  console.log(url, 'INIT')
  useEffect(() => {
    console.log(url, 'aiii')
    // let url = window.location.toString()
    // let currentlyActive = url.split("dashboard/")[1];
    // console.log(currentlyActive, 'CURR')
    // const [activeLink, setActive] = React.useState(currentlyActive);
    setActive(url.split("dashboard/")[1]);
    console.log(activeLink, 'ACTIVE')
  }, [url])

  return (
    <div className={'toolbar'}>
      <div className={'toolbar-items'}>
        {toolbarValues.map((el, i) =>
          <NavLink key={i} className={window.location.toString().includes(el.value) ? 'active' : 'inactive'}
            to={routes.DASHBOARD + "/" + el.value}>{el.text}</NavLink>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
