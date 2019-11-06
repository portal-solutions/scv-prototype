/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TelephoneNumber from './TelephoneNumber';

const TelephoneNumbers = ({ telephoneNumbers }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section-icon">
        <i className="fas fa-phone fa-fw" />
      </div>
      <div className="profile__section-content">
        <span className="profile__section-content-header">
          {t('private.profile.telephone-numbers.telephone-numbers')}
        </span>
        {telephoneNumbers && telephoneNumbers.length ? (
          telephoneNumbers.map((tn, i) => (
            <TelephoneNumber key={i} program={tn.program} mobile={tn.mobile} home={tn.home} />
          ))
        ) : (
          <p className="text-center">
            <em>{t('no-data-available')}</em>
          </p>
        )}
      </div>
    </div>
  );
};

TelephoneNumbers.propTypes = {
  telephoneNumbers: PropTypes.arrayOf(PropTypes.shape(TelephoneNumber.propTypes))
};

TelephoneNumbers.defaultProps = {
  telephoneNumbers: []
};

export default TelephoneNumbers;
