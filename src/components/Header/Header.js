import React from 'react'
import './Header.scss'
import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { routes } from "../../utils/routes";


function Header() {
  // get location
  // assigning location variable
  // const location = useLocation();
  // destructuring pathname from location
  // const { pathname } = location;
  // Javascript split method to get the name of the path in array
  // const splitLocation = pathname.split("/");

  const isUserLoggedIn = false
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = (toggleState) => {
    setIsMenuOpen(toggleState);
  }

  const renderUserProfile = () => {
    if (isUserLoggedIn) {
      return (
        <div className={'user_profile_container_user'}>
          <NavLink
            className={'profile-text'}
            to={routes.LOGIN}
          >Cont</NavLink>
          <img alt={'imagine profile user'} className={'profile_pic'} src={'favicon.ico'} />
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
      <img className={'logo'} alt={'imagine logo vreau un doctor'} src={'/logo.svg'} />
      <div onClick={() => toggleMenu(!isMenuOpen)} className={'hamburger_icon'}><img src={isMenuOpen ? '/images/menu_open.svg' : '/images/menu_closed.svg'}></img></div>
      <div className={`hamburger_menu ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className={'menu_items'}>
          <NavLink
            to={routes.HOMEPAGE}
            onClick={() => toggleMenu(false)}
          >Acasă</NavLink>
          <NavLink
            to={routes.MEDICAL_INFO}
            onClick={() => toggleMenu(false)}
          >Informații medicale</NavLink>
          <NavLink
            to={routes.CHARITY}
            onClick={() => toggleMenu(false)}
          >Caritate</NavLink>
        </div>
        {renderUserProfile()}
        <span className={'close_btn'} onClick={() => toggleMenu(false)}><img src={'/images/close_btn.svg'} /></span>
      </div>
    </div>
  );
}

export default Header;
