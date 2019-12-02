/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../../utils/api';
import Button from '../../../../components/Button';
import Roller from '../../../../components/Loading';
import FormGroup from '../../../../components/FormGroup';
import Location from '../../../../components/Location';
import AddPersonLocationValidationError from '../../../../utils/errors/AddPersonLocationValidationError';

import 'react-bootstrap-modal/lib/css/rbm-patch.css';

const AddAddressModal = ({ programs, show, onClosing }) => {
  const { t } = useTranslation();
  const { searchLocations, addPersonLocation } = useApi();

  const searchInputRef = useRef();
  const programsContainerRef = useRef();

  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResponseData, setSearchResponseData] = useState(null);
  const [addingNewAddress, setAddingNewAddress] = useState(false);

  const resetState = () => {
    setError(null);
    setSearchQuery('');
    setSearching(false);
    setSearchResponseData(null);
    setAddingNewAddress(false);
  };

  const handleModalEntered = () => {
    searchInputRef.current.focus();
  };

  const addAddressOnHide = () => {
    resetState();

    onClosing(false);
  };

  const search = async () => {
    if (!searching && !addingNewAddress && searchQuery.length) {
      setError(null);
      setSearchResponseData(null);
      setSearching(true);

      try {
        // search locations
        const data = await searchLocations(searchQuery);

        // set response data
        setSearchResponseData(data);
      } catch (err) {
        setError(err);
      }

      setSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  const submit = async () => {
    try {
      setError(null);

      // get selected location id
      const selectedLocation = document.querySelector('input[name="locationRadios"]:checked');
      const locationId = selectedLocation !== null ? selectedLocation.value : null;

      // get selected program ids
      const programIds = Array.from(
        programsContainerRef.current.querySelectorAll('input[type="checkbox"]:checked')
      ).map((i) => i.value);

      // call api
      await addPersonLocation(locationId, programIds);

      // close modal
      onClosing(true);
    } catch (err) {
      setError(err);
      setAddingNewAddress(false);
    }
  };

  const handleSubmit = () => {
    setError(null);
    setAddingNewAddress(true);

    submit();
  };

  return (
    <>
      <Modal
        backdrop="static"
        large
        show={show}
        onEntered={handleModalEntered}
        onHide={addAddressOnHide}
        aria-labelledby="ModalHeader">
        <Modal.Header closeButton={!searching && !addingNewAddress}>
          <Modal.Title id="ModalHeader">
            <i className="fas fa-plus mr-3" /> {t('private.profile.addresses.add.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger">
              <span>{error.message}</span>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup label={t('private.profile.addresses.add.search-label')} labelFor="addressSearchQuery">
                  <div className="input-group">
                    <input
                      ref={searchInputRef}
                      type="text"
                      id="addressSearchQuery"
                      className="form-control"
                      placeholder={t('private.profile.addresses.add.search-placeholder')}
                      style={{ height: '36px', minHeight: '36px' }}
                      value={searchQuery}
                      disabled={addingNewAddress}
                      onChange={(e) => {
                        if (!searching) {
                          setSearchQuery(e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          search();
                        }
                      }}
                    />
                    <div className="input-group-btn">
                      <Button
                        variant={Button.variants.primary}
                        size={Button.sizes.small}
                        disabled={searching || addingNewAddress}
                        onClick={handleSearch}>
                        {t('action.search')}
                      </Button>
                    </div>
                  </div>
                </FormGroup>
              </form>
            </div>
          </div>

          {searching && (
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="m-4">
                  <Roller />
                </div>
              </div>
            </div>
          )}

          {!searching && searchResponseData && (
            <div className="row mt-4">
              <div className="col-xs-12">
                {searchResponseData.length ? (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup
                      required
                      label={t('private.profile.addresses.add.select-address')}
                      labelFor={`locationRadios_${searchResponseData[0].id}`}
                      errorMessage={
                        error !== null && error instanceof AddPersonLocationValidationError
                          ? error.locationMessage
                          : null
                      }>
                      {searchResponseData.map((location) => {
                        return (
                          <div className="radio" key={location.id} disabled={addingNewAddress}>
                            <label htmlFor={`locationRadios_${location.id}`}>
                              <input
                                type="radio"
                                name="locationRadios"
                                id={`locationRadios_${location.id}`}
                                value={location.id}
                                disabled={addingNewAddress}
                              />
                              <Location location={location} oneline />
                            </label>
                          </div>
                        );
                      })}
                    </FormGroup>

                    <div ref={programsContainerRef}>
                      <FormGroup
                        required
                        label={t('private.profile.addresses.add.share-with')}
                        labelFor={`programCheckboxes_${searchResponseData[0].id}`}
                        errorMessage={
                          error !== null && error instanceof AddPersonLocationValidationError
                            ? error.programsMessage
                            : null
                        }>
                        {programs.map((p) => {
                          return (
                            <div
                              className="checkbox"
                              key={p.ActivityIdentification.IdentificationID}
                              disabled={addingNewAddress}>
                              <label htmlFor={`programCheckboxes_${p.ActivityIdentification.IdentificationID}`}>
                                <input
                                  type="checkbox"
                                  id={`programCheckboxes_${p.ActivityIdentification.IdentificationID}`}
                                  value={p.ActivityIdentification.IdentificationID}
                                  disabled={addingNewAddress}
                                />
                                {t(`programs.${p.ActivityIdentification.IdentificationID}`)}
                              </label>
                            </div>
                          );
                        })}
                      </FormGroup>
                    </div>
                  </form>
                ) : (
                  <p className="text-center">
                    <em>{t('no-data-available')}</em>
                  </p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss disabled={searching || addingNewAddress} className="btn btn-link">
            {t('action.cancel')}
          </Modal.Dismiss>
          <Button
            disabled={
              searching ||
              addingNewAddress ||
              searchResponseData === null ||
              searchResponseData.length === 0 ||
              programs === null ||
              programs.length === 0
            }
            onClick={handleSubmit}>
            {addingNewAddress && <i className="fas fa-spinner fa-spin" aria-hidden="true" />}
            <span className="ml-2">{t('private.profile.addresses.add.submit')}</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddAddressModal.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  onClosing: PropTypes.func.isRequired
};

export default AddAddressModal;
