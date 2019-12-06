import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const DateOfBirth = ({ program, dateOfBirth }) => {
  const { t } = useTranslation();

  return (
    <>
      <h4>
        {t('private.profile.dates-of-birth.date-of-birth')} - {program}
      </h4>
      <p>{new Date(dateOfBirth).toLocaleDateString()}</p>
    </>
  );
};

DateOfBirth.propTypes = {
  program: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired
};

export default DateOfBirth;
