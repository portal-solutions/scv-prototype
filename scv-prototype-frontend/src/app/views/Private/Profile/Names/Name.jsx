import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Name = ({ program, name }) => {
  const { t } = useTranslation();

  return (
    <>
      <h4>
        {t('private.profile.names.name')} - {program}
      </h4>
      <p>{name}</p>
    </>
  );
};

Name.propTypes = {
  program: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Name;
