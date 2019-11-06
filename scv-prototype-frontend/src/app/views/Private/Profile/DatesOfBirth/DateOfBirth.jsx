import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const DateOfBirth = ({ program, dateOfBirth }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.date-of-birth')} - {program}
      </strong>
      <br />
      {new Date(dateOfBirth).toLocaleDateString()}
    </p>
  );
};

DateOfBirth.propTypes = {
  program: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired
};

export default DateOfBirth;
