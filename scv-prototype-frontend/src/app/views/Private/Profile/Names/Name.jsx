import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Name = ({ program, name }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.name')} - {program}
      </strong>
      <br />
      {name}
    </p>
  );
};

Name.propTypes = {
  program: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Name;
