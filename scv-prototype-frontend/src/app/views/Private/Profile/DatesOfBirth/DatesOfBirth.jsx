/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DateOfBirth from './DateOfBirth';

const DatesOfBirth = ({ person, programs }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-calendar-alt fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="profile__section__content__title">
          <span>{t('private.profile.dates-of-birth.title')}</span>
        </div>
        {person && programs && programs.length ? (
          programs.map((p, i) => (
            <DateOfBirth
              key={i}
              program={t(`programs.${p.ActivityIdentification.IdentificationID}`)}
              dateOfBirth={person.PersonBirthDate.Date}
            />
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

DatesOfBirth.propTypes = {
  person: PropTypes.shape({
    PersonBirthDate: PropTypes.shape({ Date: PropTypes.string.isRequired })
  }),
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  )
};

DatesOfBirth.defaultProps = {
  person: null,
  programs: []
};

export default DatesOfBirth;
