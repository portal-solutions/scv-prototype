/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useApi } from '../../../utils/api';
import { usePageMetadata } from '../../../utils/page-metadata';
import Sidebar from '../Sidebar';
import Roller from '../../../components/Loading';
import Names from './Names';
import DatesOfBirth from './DatesOfBirth';
import Addresses from './Addresses';
import TelephoneNumbers from './TelephoneNumbers';
import EmailAddresses from './EmailAddresses';
import InvalidTokenError from '../../../utils/errors/InvalidTokenError';
import AuthenticationRequiredError from '../../../utils/errors/AuthenticationRequiredError';

import './Profile.scss';

const Profile = () => {
  const { t } = useTranslation();
  const { fetchProfile, fetchPerson, fetchPersonPrograms, fetchPersonLocations } = useApi();

  const [fetchData, setFetchData] = useState(true);
  const [fetchingError, setFetchingError] = useState(null);
  const [data, setData] = useState(null);

  usePageMetadata({
    documentTitle: t('private.profile.document-title'),
    pageIdentifier: t('private.profile.page-identifier'),
    pageTitle: t('private.profile.page-title')
  });

  const fetchDataFromApi = async () => {
    try {
      setData({
        profile: await fetchProfile(),
        person: await fetchPerson(),
        programs: await fetchPersonPrograms(),
        personLocations: await fetchPersonLocations()
      });
    } catch (err) {
      setFetchingError(err);
    }
  };

  useEffect(() => {
    setData(null);
    fetchDataFromApi();
  }, [fetchData]);

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

  // data is loading
  if (data === null) {
    componentToRender = (
      <div className="text-center mrgn-tp-lg">
        <Roller />
      </div>
    );
  } else {
    componentToRender = (
      <div className="panel panel-default">
        <div className="panel-heading">{t('private.profile.panel.title')}</div>
        <div className="panel-body profile">
          <Names person={data.person} programs={data.programs} />
          <hr />
          <DatesOfBirth person={data.person} programs={data.programs} />
          <hr />
          <Addresses
            programs={data.programs}
            personLocations={data.personLocations}
            onAddressAdded={() => setFetchData((prevState) => !prevState)}
          />
          <hr />
          <TelephoneNumbers programs={data.programs} telephoneNumbers={data.profile.telephoneNumbers} />
          <hr />
          <EmailAddresses programs={data.programs} emailAddresses={data.profile.emailAddresses} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-xs-12 mb-3 mt-3">
          <p>{t('private.profile.description.content')}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-3 mb-2">
          <Sidebar />
        </div>
        <div className="col-xs-12 col-md-9">{componentToRender}</div>
      </div>
    </>
  );
};

export default Profile;
