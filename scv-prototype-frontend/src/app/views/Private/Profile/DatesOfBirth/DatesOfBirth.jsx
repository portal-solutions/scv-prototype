/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DateOfBirth from './DateOfBirth';

const DatesOfBirth = ({ datesOfBirth }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-calendar-alt fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="mb-4">
          <span className="profile__section__content__title">{t('private.profile.dates-of-birth.title')}</span>
        </div>
        {datesOfBirth && datesOfBirth.length ? (
          datesOfBirth.map((dob, i) => <DateOfBirth key={i} program={dob.program} dateOfBirth={dob.dateOfBirth} />)
        ) : (
          <p className="text-center">
            <em>{t('no-data-available')}</em>
          </p>
        )}
      </div>
    </div>
  );
};

DatesOfBirth.propTypes = {
  datesOfBirth: PropTypes.arrayOf(PropTypes.shape(DateOfBirth.propTypes))
};

DatesOfBirth.defaultProps = {
  datesOfBirth: []
};

export default DatesOfBirth;
