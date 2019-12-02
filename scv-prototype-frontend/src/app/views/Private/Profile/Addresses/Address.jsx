/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Location from '../../../../components/Location';

const Address = ({ personLocation }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.addresses.address')} -{' '}
        {t(`location.category.${personLocation.locationAddressCategoryText}`)} -{' '}
        {t(`programs.${personLocation.programId}`)}
      </strong>
      <br />
      <Location location={personLocation.location} />
      <br />
      <em>
        {t('status') + t('colon')}&nbsp;
        {personLocation.statusText}&nbsp;
        {new Date(personLocation.statusDate).toLocaleDateString()}
      </em>
    </p>
  );
};

Address.propTypes = {
  personLocation: PropTypes.shape({
    programId: PropTypes.string.isRequired,
    locationAddressCategoryText: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    statusDate: PropTypes.string.isRequired,
    location: Location.propTypes.location
  }).isRequired
};

export default Address;
