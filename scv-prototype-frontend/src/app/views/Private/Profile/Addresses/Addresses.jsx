/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Address from './Address';
import AddAddressModal from './AddAddressModal';
import Button from '../../../../components/Button';

const Addresses = ({ programs, personLocations, onAddressAdded }) => {
  const { t } = useTranslation();

  const [addAddressModalShow, setAddAddressModalShow] = useState(false);

  const addAddressModalOnClosing = (addressAdded) => {
    setAddAddressModalShow(false);

    if (addressAdded) {
      onAddressAdded();
    }
  };

  return (
    <>
      <AddAddressModal programs={programs} show={addAddressModalShow} onClosing={addAddressModalOnClosing} />

      <div className="profile__section">
        <div className="profile__section__icon">
          <i className="fas fa-map-marker-alt fa-fw" />
        </div>
        <div className="profile__section__content">
          <div className="profile__section__content__title">
            <span>{t('private.profile.addresses.title')}</span>
            <Button
              size={Button.sizes.default}
              variant={Button.variants.default}
              onClick={() => setAddAddressModalShow(true)}>
              <i className="fas fa-plus" />
              {t('private.profile.addresses.add.trigger')}
            </Button>
          </div>
          {personLocations && personLocations.length ? (
            personLocations.map((personLocation, idx) => <Address key={idx} personLocation={personLocation} />)
          ) : (
            <p className="text-center">
              <em>{t('no-data-available')}</em>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

Addresses.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  ).isRequired,
  personLocations: PropTypes.arrayOf(PropTypes.shape(Address.propTypes.personLocation)),
  onAddressAdded: PropTypes.func.isRequired
};

Addresses.defaultProps = {
  personLocations: []
};

export default Addresses;
