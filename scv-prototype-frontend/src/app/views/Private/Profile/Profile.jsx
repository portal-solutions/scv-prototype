/* eslint-disable react/jsx-one-expression-per-line */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useApi } from '../../../utils/api';
import { usePageMetadata } from '../../../utils/page-metadata';
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

  // RETURNS component to render
  // error occured
  if (error) {
    // error occured because token is invalid, user needs to sign-in
    if (error.name === 'InvalidTokenError') {
      return <Redirect to={{ pathname: '/sign-in', state: { tokenExpired: true } }} />;
    }

    // eslint-disable-next-line no-console
    console.error(error);

    return (
      <div className="alert alert-danger">
        <span>{t('something-went-wrong')}</span>
      </div>
    );
  }

  // data is loading
  if (data === null) {
    return (
      <div className="text-center mrgn-tp-lg">
        <Roller />
      </div>
    );
  }

  // data loaded
  const fakedata = {
    names: [
      {
        program: 'Job Bank',
        name: 'Client name'
      },
      {
        program: 'National Student Loans Service Center (NSLSC)',
        name: 'Client name'
      }
    ],
    datesOfBirth: [
      {
        program: 'Job Bank',
        dateOfBirth: '1985-01-10'
      },
      {
        program: 'National Student Loans Service Center (NSLSC)',
        dateOfBirth: '1985-01-10'
      }
    ],
    addresses: [
      {
        program: 'Job Bank',
        address: 'Client street address\nCity, Prov/Terr\nPostal code'
      },
      {
        program: 'National Student Loans Service Center (NSLSC)',
        address: 'Different client street address\nCity, Prov/Terr\nPostal code'
      }
    ],
    telephoneNumbers: [
      {
        program: 'Job Bank',
        mobile: '506-546-6565',
        home: '506-546-2222'
      },
      {
        program: 'National Student Loans Service Center (NSLSC)',
        home: '506-546-2222'
      }
    ],
    emailAddresses: [
      {
        program: 'Job Bank',
        emailAddress: 'client-address@email.ca'
      },
      {
        program: 'National Student Loans Service Center (NSLSC)',
        emailAddress: 'different-address@email.com'
      }
    ]
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{t('private.profile.panel.title')}</div>
      <div className="panel-body profile">
        <Names names={fakedata.names} />
        <hr />
        <DatesOfBirth datesOfBirth={fakedata.datesOfBirth} />
        <hr />
        <Addresses addresses={fakedata.addresses} />
        <hr />
        <TelephoneNumbers telephoneNumbers={fakedata.telephoneNumbers} />
        <hr />
        <EmailAddresses emailAddresses={fakedata.emailAddresses} />
      </div>
    </div>
  );
};

export default Profile;
