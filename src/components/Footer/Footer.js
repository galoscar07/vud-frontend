import React, { useState, useEffect } from 'react'
import './Footer.scss'
import { API_MAP, getAPILink, routes } from "../../utils/routes";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


const socials = [
  {
    iconPath: '/images/icons/Facebook.svg',
    imageAlt: 'Link catre pagina de Facebook a Vreau un Doctor',
    href: 'https://facebook.com',
  },
  {
    iconPath: '/images/icons/Linkedin.svg',
    imageAlt: 'Link catre pagina de LinkedIn a Vreau un Doctor',
    href: 'https://linkedin.com',
  },
  {
    iconPath: '/images/icons/Youtube.svg',
    imageAlt: 'Link catre pagina de Youtube a Vreau un Doctor',
    href: 'https://youtube.com',
  }
]

const navLinks = [
  {
    label: 'Acasa',
    link: routes.HOMEPAGE,
  },
  {
    label: 'Informații medicale',
    link: routes.ARTICLES
  }
]

function Footer() {
  const [displayMoreCards, setDisplayMoreCards] = React.useState(true);
  const [footerOptions, setFooterOptions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  useEffect(() => {
    fetch(
      getAPILink(API_MAP.GET_FOOTER_LABELS), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setFooterOptions(res)
      })
  }
    , [])

  return (
    <div className={'footer-wrapper'}>
      <div className={'footer-menu'}>
        <div className={'nav-links'}>
          <img alt={'Vreau un doctor logo'} src={'/logo.svg'} />
          <div className={'nav-links-container'}>
            {navLinks.map((speciality, index) => {
              return (
                <NavLink
                  to={speciality.link}
                  key={index}
                >{speciality.label}</NavLink>
              )
            })}
          </div>

        </div>
        <div className={'specialities'}>
          {footerOptions.map((speciality, index) => {
            return (
              <React.Fragment key={index}
              >
                <NavLink className="desktop"
                  to={speciality.link}
                >{speciality.label}</NavLink>
                <NavLink
                  className={`mobile ${displayMoreCards && index > 10 ? ' hide' : ''}`}
                  to={speciality.link}
                >{speciality.label}</NavLink>
              </React.Fragment>)
          })}
        </div>
        <div className={`view-more-btn mobile ${footerOptions.length < 10 ? 'hide' : ''}`} onClick={() => setDisplayMoreCards(!displayMoreCards)}>
          {displayMoreCards ? 'Vezi mai multe' : 'Vezi mai putine'}
        </div>
      </div>
      <div className={'footer-copy-rights'}>
        <div className={'icons'}>
          {loading ? <LoadingSpinner />
            : socials.map((socialItem, index) => {
              return (
                <a rel="noreferrer" key={index} href={socialItem.href} target={"_blank"}>
                  <img alt={socialItem.imageAlt} src={socialItem.iconPath} />
                </a>
              )
            })
          }
        </div>
        <div className={'copy-rights'}>
          Copyright © VreauUnDoctor, 2021. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
