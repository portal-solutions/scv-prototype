/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Address from './Address';
import Button from '../../../../components/Button';

const Addresses = ({ addresses }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-map-marker-alt fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="profile__section__content__title">
          <span>{t('private.profile.addresses.title')}</span>
          <Button size={Button.sizes.default} variant={Button.variants.default}>
            <i className="fas fa-plus" />
            <strong>{t('private.profile.addresses.add')}</strong>
          </Button>
        </div>
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
