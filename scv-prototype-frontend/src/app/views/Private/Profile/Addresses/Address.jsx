/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Address = ({ program, address }) => {
  const { t } = useTranslation();
  const addressParts = address.split('\n');

  return (
    <p>
      <strong>
        {t('private.profile.addresses.address')} - {program}
      </strong>
      <br />
      {addressParts.map((s, i) => (
        <React.Fragment key={i}>
          {s}
          {i !== addressParts.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
};

Address.propTypes = {
  program: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

export default Address;
