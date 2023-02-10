import React from 'react'
import './Header.scss'
import {NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {routes} from "../../utils/routes";


function Header() {
  // get location
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const isUserLoggedIn = false

  const renderUserProfile = () => {
    if (isUserLoggedIn) {
      return (
        <div className={'user_profile_container_user'}>
          <NavLink
            className={'profile-text'}
            to={routes.LOGIN}
          >Cont</NavLink>
          <img className={'profile_pic'} src={'favicon.ico'} />
        </div>
      )
    } else {
      return (
        <div className={'user_profile_container_no_user'}>
          <NavLink
            to={routes.LOGIN}
          >Conectează-te/Inregistrează-te</NavLink>
        </div>
      )
    }
  }

  return (
    <div className={'header'}>
      <img src={'/logo.svg'}/>
      <div className={'menu_items'}>
        <NavLink
          to={routes.HOMEPAGE}
        >Acasă</NavLink>
        <NavLink
          to={routes.MEDICAL_INFO}
        >Informații medicale</NavLink>
        <NavLink
          to={routes.CHARITY}
        >Caritate</NavLink>
      </div>
      {
        renderUserProfile()
      }
    </div>
  );
}

export default Header;
