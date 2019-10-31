import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';
import './Home.scss';

/**
 * A simple Home page.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Home = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('home.document-title'),
    pageIdentifier: t('home.page-identifier'),
    pageTitle: t('home.page-title')
  });

  return (
    <MainLayout>
      <Notifications />
      <BenefitsServices />
      <p>
        <Trans i18nKey="home.message" />
      </p>
      <p>
        <Trans i18nKey="home.more-information">
          <a href="https://projects.invisionapp.com/share/CAPAK97BE6D" target="_blank" rel="noopener noreferrer">
            click here
          </a>
        </Trans>
      </p>
    </MainLayout>
  );
};

const Notifications = () => {
  return (
    <div className="row notification-container mrgn-bttm-lg">
      <div className="notification col-md-6 col-md-push-3 col-xs-10 col-xs-push-1 z-depth-1 text-center">
        <div className="info-icon z-depth-1">
          <i className="fas fa-bell fa-fw" />
        </div>
        <p className="mrgn-bttm-0 text-primary">
          You have <strong>1</strong> new notification.
        </p>
        <p className="small">
          Action is required pertaining to your <strong>EI application</strong>.
        </p>
        <Button size={Button.sizes.xs} className="action-button z-depth-1">
          View actions required
        </Button>
      </div>
    </div>
  );
};

const BenefitsServices = () => {
  return (
    <div className="benefits-services-container">
      <div className="benefits-services panel panel-primary z-depth-1">
        <div className="panel-heading">
          <h2 className="title h3">Your benefits and services dashboard</h2>
          {/* eslint-disable-next-line */}
          <a href="#" className="action">
            Manage my benefits and services
          </a>
        </div>
        <div className="panel-body">
          <div className="current-benefits-services-container z-depth-1">
            <h3>Current benefits and services</h3>
            <div className="current-benefits-services">
              <div className="item z-depth-1">
                <span className="fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-book fa-stack-1x fa-inverse" />
                </span>
                <div className="details">
                  <h4 className="h3">Canada Learning Bond</h4>
                  <Button className="mt-4 z-depth-1">More details</Button>
                </div>
              </div>
              <div className="item z-depth-1">
                <span className="fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-briefcase fa-stack-1x fa-inverse" />
                </span>
                <div className="details">
                  <h4 className="h3">Employment insurance</h4>
                  <Button className="mt-4 z-depth-1">More details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
