import React, {useEffect, useState} from 'react'
import './Header.scss'
import {NavLink, useNavigate} from "react-router-dom";
import { routes } from "../../utils/routes";
import {getUserFromLocal} from "../../utils/localStorage";


function Header() {
  // TODO Make all the elements to be centered
  // TODO After login it doesn't change the icon
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    profilePicture: null
  })

  const toggleMenu = (toggleState) => {
    setIsMenuOpen(toggleState);
  }

  useEffect(() => {
    const user = getUserFromLocal()
    if (Object.keys(user).length > 0) {
      setUser({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        profilePicture: user.profile_picture || null
      })
      setIsUserLoggedIn(true)
    }
  }, [])

  const renderUserProfile = () => {
    if (isUserLoggedIn) {
      return (
        <div className={'user_profile_container_user'}>
          <NavLink
            className={'profile-text'}
            to={routes.DASHBOARD}
          >Cont {user.firstName} {user.lastName}</NavLink>
          <img alt={'imagine profile user'} className={'profile_pic'}
               src={user.profilePicture ? URL.createObjectURL(user.profilePicture) : '/images/user.svg' } />
        </div>
      )
    } else {
      return (
        <div className={'user_profile_container_no_user'}>
          <NavLink onClick={() => toggleMenu(!isMenuOpen)}
            to={routes.LOGIN}
          >Conectează-te/Inregistrează-te</NavLink>
        </div>
      )
    }
  }

  return (
    <div className={'header'}>
      <img onClick={() => navigate(routes.HOMEPAGE)} className={'logo'} alt={'imagine logo vreau un doctor'} src={'/logo.svg'} />
      <div onClick={() => toggleMenu(!isMenuOpen)} className={'hamburger_icon'}><img src={isMenuOpen ? '/images/menu_open.svg' : '/images/menu_closed.svg'}></img></div>
      <div className={`hamburger_menu ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className={'menu_items'}>
          <NavLink
            to={routes.HOMEPAGE}
            onClick={() => toggleMenu(false)}
          >Acasă</NavLink>
        </div>
        {renderUserProfile()}
        <span className={'close_btn'} onClick={() => toggleMenu(false)}><img src={'/images/close_btn.svg'} /></span>
      </div>
    </div>
  );
}

export default Header;
