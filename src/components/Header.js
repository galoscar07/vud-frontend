import React from 'react'
import './Header.scss'
import {Link, NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";


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
            to={'/login'}
          >Cont</NavLink>
          <img className={'profile_pic'} src={'favicon.ico'} />
        </div>
      )
    } else {
      return (
        <div className={'user_profile_container_no_user'}>
          <NavLink
            to={'/login'}
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
          to={'/'}
        >Acasă</NavLink>
        <NavLink
          to={'/medical-info'}
        >Informații medicale</NavLink>
        <NavLink
          to={'/charity'}
        >Caritate</NavLink>
      </div>
      {
        renderUserProfile()
      }
    </div>
  );
}

export default Header;
