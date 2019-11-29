/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Address = ({ location }) => {
  const { i18n, t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.addresses.address')} - {location.id} {/* program */}
      </strong>
      <br />
      {`${location.line1}`}
      <br />
      {`${location.city}, ${location.provinceName[i18n.language === 'fr' ? 'fra' : 'eng']}`}
      <br />
      {location.countryName}
    </p>
  );
};

Address.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    countryName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    line1: PropTypes.string.isRequired,
    provinceName: PropTypes.shape({
      eng: PropTypes.string,
      fra: PropTypes.string
    }).isRequired
  }).isRequired
};

export default Address;
