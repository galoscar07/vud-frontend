import React, { useState } from 'react'
import './Footer.scss'
import { routes } from "../../utils/routes";
import { NavLink } from "react-router-dom";

const socials = [
  {
    iconPath: '/images/icons/Facebook.svg',
    imageAlt: 'Link catre pagina de Facebook a Vreau un Doctor',
    href: 'https://facebook.com',
  },
  {
    iconPath: '/images/icons/LinkedIn.svg',
    imageAlt: 'Link catre pagina de LinkedIn a Vreau un Doctor',
    href: 'https://linkedin.com',
  },
  {
    iconPath: '/images/icons/Youtube.svg',
    imageAlt: 'Link catre pagina de Youtube a Vreau un Doctor',
    href: 'https://youtube.com',
  }
]

const specialitiesLinks = [
  {
    label: 'Alergologie si Imunologie Clinica',
    link: '/nothing',
  },
  {
    label: 'Anatomie Patologica',
    link: '/nothing',
  },
  {
    label: 'Anestezie si Terapie Intensiva',
    link: '/nothing',
  },
  {
    label: 'Boli Infectioase',
    link: '/nothing',
  },
  {
    label: 'Cardiologie',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Cardiovasculara',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Dento - Alveolara',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Generala',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Orala si Maxilo - Faciala',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Pediatrica',
    link: '/nothing',
  },
  {
    label: 'Dermatovenerologie',
    link: '/nothing',
  },
  {
    label: 'Diabet Zaharat, Nutritie si Boli Metabolice',
    link: '/nothing',
  },
  {
    label: 'Endocrinologie',
    link: '/nothing',
  },
  {
    label: 'Epidemiologie',
    link: '/nothing',
  },
  {
    label: 'Expertiza Medicala a Capacitatii de Munca',
    link: '/nothing',
  },
  {
    label: 'Gastroenterologie',
    link: '/nothing',
  },
  {
    label: 'Genetica Medicala',
    link: '/nothing',
  },
  {
    label: 'Geriatrie si Gerontologie',
    link: '/nothing',
  },
  {
    label: 'Hematologie',
    link: '/nothing',
  },
  {
    label: 'Oncologie Medicala',
    link: '/nothing',
  },
  {
    label: 'Ortopedie si Traumatologie',
    link: '/nothing',
  },
  {
    label: 'Otorinolaringologie (ORL)',
    link: '/nothing',
  },
  {
    label: 'Pediatrie',
    link: '/nothing',
  },
  {
    label: 'Pneumologie',
    link: '/nothing',
  },
  {
    label: 'Psihiatrie',
    link: '/nothing',
  },
  {
    label: 'Psihiatrie Pediatrica',
    link: '/nothing',
  },
  {
    label: 'Psihologie',
    link: '/nothing',
  },
  {
    label: 'Radiologie - Imagistica Medicala',
    link: '/nothing',
  },
  {
    label: 'Radioterapie',
    link: '/nothing',
  },
  {
    label: 'Alergologie si Imunologie Clinica',
    link: '/nothing',
  },
  {
    label: 'Anatomie Patologica',
    link: '/nothing',
  },
  {
    label: 'Anestezie si Terapie Intensiva',
    link: '/nothing',
  },
  {
    label: 'Boli Infectioase',
    link: '/nothing',
  },
  {
    label: 'Cardiologie',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Cardiovasculara',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Dento - Alveolara',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Generala',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Orala si Maxilo - Faciala',
    link: '/nothing',
  },
  {
    label: 'Chirurgie Pediatrica',
    link: '/nothing',
  }
]

const navLinks = [
  {
    label: 'Acasa',
    link: routes.HOMEPAGE,
  },
  {
    label: 'Informatii Medicale',
    link: routes.MEDICAL_INFO,
  },
  {
    label: 'Caritate',
    link: routes.CHARITY,
  },
  {
    label: 'Contact',
    link: routes.CONTACT,
  }
]

function Footer() {
  const [displayMoreCards, setDisplayMoreCards] = React.useState(true);

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
          {specialitiesLinks.map((speciality, index) => {
            return (
              <NavLink
                className={`${displayMoreCards && 'mobile '}${displayMoreCards && index > 10 ? ' hide' : ''}`}
                key={index}
                to={speciality.link}
              >{speciality.label}</NavLink>
            )
          })}
        </div>
        <div className="view-more-btn mobile" onClick={() => setDisplayMoreCards(!displayMoreCards)}>
          {displayMoreCards ? 'Vezi mai multe' : 'Vezi mai putine'}
        </div>
      </div>
      <div className={'footer-copy-rights'}>
        <div className={'icons'}>
          {
            socials.map((socialItem, index) => {
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
