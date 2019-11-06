/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Address from './Address';

const Addresses = ({ addresses }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section-icon">
        <i className="fas fa-map-marker-alt fa-fw" />
      </div>
      <div className="profile__section-content">
        <span className="profile__section-content-header">{t('private.profile.addresses')}</span>
        {addresses && addresses.length ? (
          addresses.map((a, i) => <Address key={i} program={a.program} address={a.address} />)
        ) : (
          <p className="text-center">
            <em>{t('no-data-available')}</em>
          </p>
        )}
      </div>
    </div>
  );
};

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape(Address.propTypes))
};

Addresses.defaultProps = {
  addresses: []
};

export default Addresses;
