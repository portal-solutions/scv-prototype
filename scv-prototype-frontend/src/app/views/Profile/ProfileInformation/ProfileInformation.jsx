/* eslint-disable react/jsx-one-expression-per-line */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import Button from '../../../components/Button';
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

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [fetchData, setFetchData] = useState(false);

  usePageMetadata({
    documentTitle: `${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`,
    pageIdentifier: t('profile.profile-information.page-identifier'),
    pageTitle: `${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData(await fetchProfile());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchData, fetchProfile]);

  return (
    <>
      {error && error.name === 'InvalidTokenError' && (
        <Redirect to={{ pathname: '/sign-in', state: { tokenExpired: true } }} />
      )}

      {error && (error.name !== 'InvalidTokenError' || <Error />)}

      {loading && (
        <div className="text-center mrgn-tp-lg">
          <Roller />
        </div>
      )}

      {data && (
        <>
          <div className="text-right">
            <Button
              variant={Button.variants.link}
              size={Button.sizes.sm}
              className="text-lowercase"
              onClick={() => setFetchData(!fetchData)}
            >
              <i className="fas fa-sync mr-2" /> {t('action.refresh')}
            </Button>
          </div>
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
      )}
    </>
  );
};

const Error = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="alert alert-danger">
        <span>{t('something-went-wrong')}</span>
      </div>
    </>
  );
};

export default ProfileInformation;
