import React from 'react';
import { useTranslation } from 'react-i18next';

const PersonalInformation = ({
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  socialInsuranceNumber,
  languageOfPreference
}) => {
  const { t } = useTranslation();

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{t('private.profile.personal-information.title')}</div>
      <div className="panel-body text-center">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <label>{t('private.profile.personal-information.first-name')}</label>
            <div>{firstName || '-'}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <label>{t('private.profile.personal-information.middle-name')}</label>
            <div>{middleName || '-'}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <label>{t('private.profile.personal-information.last-name')}</label>
            <div>{lastName || '-'}</div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <label>{t('private.profile.personal-information.date-of-birth')}</label>
              <div>{dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : '-'}</div>
            </div>
            <div className="col-xs-12 col-md-4">
              <label>{t('private.profile.personal-information.social-insurance-number')}</label>
              <div>{socialInsuranceNumber || '-'}</div>
            </div>
            <div className="col-xs-12 col-md-4">
              <label>{t('private.profile.personal-information.language-of-preference')}</label>
              <div>{languageOfPreference || '-'}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PersonalInformation;
