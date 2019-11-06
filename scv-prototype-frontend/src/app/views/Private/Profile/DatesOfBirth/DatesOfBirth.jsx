/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DateOfBirth from './DateOfBirth';

const DatesOfBirth = ({ datesOfBirth }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h3>
          <i className="fas fa-calendar fa-fw" />
        </h3>
      </div>
      <div>
        <h3>{t('private.profile.dates-of-birth')}</h3>
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
