import React from 'react'
import './Header.scss'
import {Link} from "react-router-dom";

function Header() {
  return (
    <div className={'header'}>
      <img src={'/logo.svg'}/>
      <div className={'menu_items'}>
        <Link to={'/'}>Acasă</Link>
        <Link to={'/medical-info'}>Informații medicale</Link>
        <Link to={'/charity'}>Caritate</Link>
      </div>
    </div>
  );
}

export default Header;
