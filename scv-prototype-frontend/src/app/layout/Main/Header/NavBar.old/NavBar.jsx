import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../utils/auth';
import './NavBar.scss';
import NavBarItem from './NavBarItem';

const NavBar = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    auth.authenticated &&
    !auth.tokenExpired && (
      <nav
        role="navigation"
        id="wb-sm"
        data-trgt="mb-pnl"
        className="wb-menu visible-md visible-lg main-navigation-menu"
        typeof="SiteNavigationElement"
      >
        <div className="container nvbar">
          <h2>Topics menu</h2>
          <div className="row">
            <ul className="list-inline menu">
              <NavBarItem text={t('wet-boew.header.navbar.home')} iconClass="fas fa-home" to="/private" exact />
              <NavBarItem text={t('wet-boew.header.navbar.profile')} iconClass="fas fa-user" to="/private/profile" />
              <NavBarItem
                text={t('wet-boew.header.navbar.service-preferences')}
                iconClass="fas fa-cog"
                to="/private/service-preferences"
              />
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default NavBar;
