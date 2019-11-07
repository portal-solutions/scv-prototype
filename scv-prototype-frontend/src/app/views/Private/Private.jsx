/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from '../../layout/Main';
import SideBarItem from './SideBarItem';
import Profile from './Profile';
import ServicePreferences from './ServicePreferences';
import Consent from './Consent';
import ServiceActions from './ServiceActions';

const Private = ({ match }) => {
  const { t } = useTranslation();

  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const { path, url } = match;

  return (
    <MainLayout>
      <div className="row">
        <div className="col-xs-12 mb-3 mt-3">
          <Switch>
            <Route exact path={`${path}/profile`}>
              <p>{t('private.profile.description.content')}</p>
            </Route>
            <Route exact path={`${path}/service-preferences`}>
              <p>{t('private.service-preferences.description.content')}</p>
            </Route>
            <Route exact path={`${path}/consent`}>
              <p>{t('private.consent.description.content-top')}</p>
              <ul>
                {t('private.consent.description.context-items', { returnObjects: true }).map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
              <p>{t('private.consent.description.content-bottom')}</p>
            </Route>
            <Route exact path={`${path}/service-actions`}>
              <p>{t('private.service-actions.description.content')}</p>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-3 mb-2">
          <nav role="navigation" id="wb-sec" typeof="SiteNavigationElement">
            <ul className="list-group menu list-unstyled">
              <SideBarItem text={t('private.sidebar.profile')} iconClass="fas fa-user fa-fw" to={`${url}/profile`} />
              <SideBarItem
                text={t('private.sidebar.service-preferences')}
                iconClass="fas fa-cog fa-fw"
                to={`${url}/service-preferences`}
              />
              <SideBarItem text={t('private.sidebar.consent')} iconClass="fas fa-lock fa-fw" to={`${url}/consent`} />
              <SideBarItem
                text={t('private.sidebar.service-actions')}
                iconClass="fas fa-user-friends fa-fw"
                to={`${url}/service-actions`}
              />
            </ul>
          </nav>
        </div>
        <div className="col-xs-12 col-md-9">
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${url}/profile`} />
            </Route>
            <Route exact path={`${path}/profile`} component={Profile} />
            <Route exact path={`${path}/service-preferences`} component={ServicePreferences} />
            <Route exact path={`${path}/consent`} component={Consent} />
            <Route exact path={`${path}/service-actions`} component={ServiceActions} />
          </Switch>
        </div>
      </div>
    </MainLayout>
  );
};

export default Private;
