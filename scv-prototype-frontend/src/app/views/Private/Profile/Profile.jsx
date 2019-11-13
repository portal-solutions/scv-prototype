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

import './Profile.scss';

const Profile = () => {
  const { t } = useTranslation();
  const { fetchProfile } = useApi();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  usePageMetadata({
    documentTitle: t('private.profile.document-title'),
    pageIdentifier: t('private.profile.page-identifier'),
    pageTitle: t('private.profile.page-title')
  });

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchProfile());
      } catch (err) {
        setError(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GETS proper component to render
  let componentToRender = null;

  // error occured
  if (error) {
    // error occured because token is invalid, user needs to sign-in
    if (error.name === 'InvalidTokenError') {
      return <Redirect to={{ pathname: '/msca', state: { tokenExpired: true } }} />;
    }

    // eslint-disable-next-line no-console
    console.error(error);

    componentToRender = (
      <div className="alert alert-danger">
        <span>{t('something-went-wrong')}</span>
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
    // data loaded
    componentToRender = (
      <div className="panel panel-default">
        <div className="panel-heading">{t('private.profile.panel.title')}</div>
        <div className="panel-body profile">
          <Names names={data.names} />
          <hr />
          <DatesOfBirth datesOfBirth={data.datesOfBirth} />
          <hr />
          <Addresses addresses={data.addresses} />
          <hr />
          <TelephoneNumbers telephoneNumbers={data.telephoneNumbers} />
          <hr />
          <EmailAddresses emailAddresses={data.emailAddresses} />
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
