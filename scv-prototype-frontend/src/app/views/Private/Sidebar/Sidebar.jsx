import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <nav role="navigation" id="wb-sec" typeof="SiteNavigationElement">
      <ul className="list-group menu list-unstyled">
        <SidebarItem text={t('private.sidebar.profile')} iconClass="fas fa-user fa-fw" to="/private/profile" />
        <SidebarItem
          text={t('private.sidebar.service-preferences')}
          iconClass="fas fa-cog fa-fw"
          to="/private/service-preferences"
        />
        <SidebarItem text={t('private.sidebar.consent')} iconClass="fas fa-lock fa-fw" to="/private/consent" />
        <SidebarItem
          text={t('private.sidebar.service-actions')}
          iconClass="fas fa-user-friends fa-fw"
          to="/private/service-actions"
        />
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
