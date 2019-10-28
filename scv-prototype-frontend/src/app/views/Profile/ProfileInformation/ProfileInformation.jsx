/* eslint-disable react/jsx-one-expression-per-line */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import Roller from '../../../components/Loading';
import { useApi } from '../../../utils/api';
import { usePageMetadata } from '../../../utils/page-metadata';
import Address from './Address';
import Email from './Email';
import Note from './Note';
import PersonalInformation from './PersonalInformation';
import Phone from './Phone';
import VolunteerExperience from './VolunteerExperience';

const ProfileInformation = () => {
  const { t } = useTranslation();
  const { fetchProfile } = useApi();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  usePageMetadata({
    documentTitle: `${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`,
    pageIdentifier: t('profile.profile-information.page-identifier'),
    pageTitle: `${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`
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

  // RETURNS proper component
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
  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <PersonalInformation
            firstName={data.firstName}
            middleName={data.middleName}
            lastName={data.lastName}
            dateOfBirth={data.dateOfBirth}
            socialInsuranceNumber={data.socialInsuranceNumber}
            languageOfPreference={data.languageOfPreference}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Address addresses={data.addresses} />
        </div>
        <div className="col-xs-12 col-md-6">
          <Phone phones={data.phones} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Email emails={data.emails} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <VolunteerExperience volunteerExperiences={data.volunteerExperiences} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Note notes={data.notes} />
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
