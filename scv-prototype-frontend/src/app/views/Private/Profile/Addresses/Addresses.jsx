/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Address from './Address';

const Addresses = ({ addresses }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h3>
          <i className="fas fa-pin fa-fw" />
        </h3>
      </div>
      <div>
        <h3>{t('private.profile.addresses')}</h3>
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
