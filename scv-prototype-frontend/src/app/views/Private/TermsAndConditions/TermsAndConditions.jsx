/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../utils/auth';
import { useApi } from '../../../utils/api';
import { usePageMetadata } from '../../../utils/page-metadata';
import Button from '../../../components/Button';
import Roller from '../../../components/Loading';
import InvalidTokenError from '../../../utils/errors/InvalidTokenError';
import AuthenticationRequiredError from '../../../utils/errors/AuthenticationRequiredError';

/**
 * A very simple terms and conditions component.
 *
 * @author Sebastien Comeau <sebastien.comeau@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const TermsAndConditions = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { auth, setTermsAndConditionsAgreement } = useAuth();
  const { fetchPersonPrograms } = useApi();

  const [read, setRead] = useState(false);
  const [programs, setPrograms] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);

  usePageMetadata({
    documentTitle: t('private.terms-and-conditions.document-title'),
    pageIdentifier: t('private.terms-and-conditions.page-identifier'),
    pageTitle: t('private.terms-and-conditions.page-title')
  });

  const fetchProgramFromApi = async () => {
    try {
      setPrograms(await fetchPersonPrograms());
    } catch (err) {
      setFetchingError(err);
    }
  };

  useEffect(() => {
    fetchProgramFromApi();
  }, []);

  // check if user agreed to terms and conditions
  const { from } = location.state || { from: { pathname: '/' } };

  if (auth.agreedTermsAndConditions) {
    return <Redirect to={from} />;
  }

  const handleConsent = (e) => {
    e.preventDefault();
    setTermsAndConditionsAgreement();
  };

  // GETS proper component to render
  let componentToRender = null;

  // fetching error occured
  if (fetchingError) {
    // error occured because token is invalid or user not authenticated
    if (fetchingError instanceof InvalidTokenError || fetchingError instanceof AuthenticationRequiredError) {
      // user needs to sign-in
      return <Redirect to={{ pathname: '/msca', state: { tokenExpired: true } }} />;
    }

    componentToRender = (
      <div className="alert alert-danger">
        <span>{t('something-went-wrong')}</span>
        <span className="hide">{fetchingError.message}</span>
      </div>
    );
  }

  // programs are loading
  if (programs === null) {
    componentToRender = (
      <div className="text-center mrgn-tp-lg">
        <Roller />
      </div>
    );
  } else {
    // programs loaded

    componentToRender = (
      <div className="row">
        <div className="col-xs-12">
          <div className="mb-5">
            <p>{t('private.terms-and-conditions.content.list-of-programs-participate')}</p>
            <ul>
              {programs.map((p, i) => (
                <li key={i}>{t(`programs.${p.ActivityIdentification.IdentificationID}`)}</li>
              ))}
            </ul>
            <p>{t('private.terms-and-conditions.content.clicking-below')}</p>
            <p>{t('private.terms-and-conditions.content.further-consent-provision')}</p>
            <ul>
              {t('private.terms-and-conditions.content.further-consent-provision-items', { returnObjects: true }).map(
                (obj, idx) => (
                  <li key={idx}>{obj}</li>
                )
              )}
            </ul>
          </div>
          <div className="panel panel-default mb-5">
            <div className="panel-heading">{t('private.terms-and-conditions.content.privacy-notice.heading')}</div>
            <div className="panel-body">
              <p>{t('private.terms-and-conditions.content.privacy-notice.body')}</p>
            </div>
          </div>

          <div className="checkbox mb-5">
            <label htmlFor="chkRead">
              <input id="chkRead" type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
              {t('private.terms-and-conditions.content.read-and-agree')}
            </label>
          </div>

          <div>
            <Button variant={Button.variants.primary} onClick={handleConsent} disabled={!read}>
              {t('action.continue')}
            </Button>
            <Link to="/msca" className="btn btn-link">
              {t('action.cancel')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return componentToRender;
};

export default TermsAndConditions;
