/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ModalBS from 'react-bootstrap-modal';
import Address from './Address';
import Button from '../../../../components/Button';

import 'react-bootstrap-modal/lib/css/rbm-patch.css';

const Addresses = ({ addresses }) => {
  const { t } = useTranslation();

  const [addAddress, setAddAddress] = useState(false);

  const addAdressOnClose = () => {
    setAddAddress(false);
  };

  const addAdressOnSubmit = () => {
    setAddAddress(false);
  };

  return (
    <>
      <div className="profile__section">
        <div className="profile__section__icon">
          <i className="fas fa-map-marker-alt fa-fw" />
        </div>
        <div className="profile__section__content">
          <div className="profile__section__content__title">
            <span>{t('private.profile.addresses.title')}</span>
            <Button size={Button.sizes.default} variant={Button.variants.default} onClick={() => setAddAddress(true)}>
              <i className="fas fa-plus" />
              {t('private.profile.addresses.add')}
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
      {/* <Modal title="Add an address" show={addAddress} onClose={addAdress_OnClose} onSubmit={addAdress_OnSubmit}>
        test mon copain
      </Modal> */}

      <ModalBS show={addAddress} onHide={addAdressOnClose} aria-labelledby="ModalHeader">
        <ModalBS.Header closeButton>
          <ModalBS.Title id="ModalHeader">
            <i className="fas fa-plus mr-3" /> Add an address
          </ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>
          <p>Some Content here</p>
          <p>Some Content here</p>
          <p>Some Content here</p>
          <p>Some Content here</p>
        </ModalBS.Body>
        <ModalBS.Footer>
          <ModalBS.Dismiss className="btn btn-default">Cancel</ModalBS.Dismiss>
          <Button onClick={addAdressOnSubmit}>Save</Button>
        </ModalBS.Footer>
      </ModalBS>
    </>
  );
};

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape(Address.propTypes))
};

Addresses.defaultProps = {
  addresses: []
};

export default Addresses;
