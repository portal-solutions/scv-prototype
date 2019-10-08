import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../../utils/auth';
import NavBarItem from './NavBarItem';
import './NavBar.scss';

const NavBar = () => {
  const { t } = useTranslation();
  const { authContext } = useAuthContext();

  return (
    authContext.authenticated && (
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
                text={t('wet-boew.header.navbar.notifications')}
                iconClass="fas fa-bell"
                to="/private/notifications"
              />
              <NavBarItem text={t('wet-boew.header.navbar.inbox')} iconClass="fas fa-inbox" to="/private/inbox" />
              <NavBarItem
                text={t('wet-boew.header.navbar.lets-connect')}
                iconClass="fas fa-comments"
                to="/private/lets-connect"
              />
              <NavBarItem
                text={t('wet-boew.header.navbar.book-appointment')}
                iconClass="fas fa-calendar"
                to="/private/book-appointment"
              />
              <NavBarItem
                text={t('wet-boew.header.navbar.benefits-services')}
                iconClass="fas fa-hand-holding-heart"
                to="/private/benefits-services"
              />
              <NavBarItem
                text={t('wet-boew.header.navbar.jobs-skills')}
                iconClass="fas fa-briefcase"
                to="/private/jobs-skills"
              />
              <NavBarItem
                text={t('wet-boew.header.navbar.preferences')}
                iconClass="fas fa-cog"
                to="/private/preferences"
              />
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default NavBar;
