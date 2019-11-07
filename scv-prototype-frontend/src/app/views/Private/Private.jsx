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

  return (
    <MainLayout>
      <div className="row">
        <div className="col-xs-12 mb-3 mt-3">
          <Switch>
            <Route exact path={`${match.path}/profile`}>
              <p>{t('private.profile.description.content')}</p>
            </Route>
            <Route exact path={`${match.path}/service-preferences`}>
              <p>{t('private.service-preferences.description.content')}</p>
            </Route>
            <Route exact path={`${match.path}/consent`}>
              <p>{t('private.consent.description.content-top')}</p>
              <ul>
                {t('private.consent.description.context-items', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t('private.consent.description.content-bottom')}</p>
            </Route>
            <Route exact path={`${match.path}/service-actions`}>
              <p>{t('private.service-actions.description.content')}</p>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-3 mb-2">
          <nav role="navigation" id="wb-sec" typeof="SiteNavigationElement">
            <ul className="list-group menu list-unstyled">
              <SideBarItem
                text={t('private.sidebar.profile')}
                iconClass="fas fa-user fa-fw"
                to={`${match.path}/profile`}
              />
              <SideBarItem
                text={t('private.sidebar.service-preferences')}
                iconClass="fas fa-cog fa-fw"
                to={`${match.path}/service-preferences`}
              />
              <SideBarItem
                text={t('private.sidebar.consent')}
                iconClass="fas fa-lock fa-fw"
                to={`${match.path}/consent`}
              />
              <SideBarItem
                text={t('private.sidebar.service-actions')}
                iconClass="fas fa-user-friends fa-fw"
                to={`${match.path}/service-actions`}
              />
            </ul>
          </nav>
        </div>
        <div className="col-xs-12 col-md-9">
          <Switch>
            <Route exact path={match.path}>
              <Redirect to={`${match.path}/profile`} />
            </Route>
            <Route exact path={`${match.path}/profile`} component={Profile} />
            <Route exact path={`${match.path}/service-preferences`} component={ServicePreferences} />
            <Route exact path={`${match.path}/consent`} component={Consent} />
            <Route exact path={`${match.path}/service-actions`} component={ServiceActions} />
          </Switch>
        </div>
      </div>
    </MainLayout>
  );
};

export default Private;
