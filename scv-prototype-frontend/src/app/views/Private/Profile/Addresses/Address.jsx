/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Address = ({ location }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.addresses.address')} - {location.LocationIdentification.IdentificationID} {/*program*/}
      </strong>
      <br />
      {`${location.LocationAddress.LocationStreet.StreetNumberText} ${location.LocationAddress.LocationStreet.StreetName} ${location.LocationAddress.LocationStreet.StreetCategoryText}`}
      <br />
      {`${location.LocationAddress.LocationCityName}, ${location.LocationAddress.LocationState.LocationStateName[0].eng}`}
      <br />
      {location.LocationAddress.LocationCountry.LocationCountryName}
    </p>
  );
};

Address.propTypes = {
  location: PropTypes.shape({
    LocationIdentification: PropTypes.shape({
      IdentificationID: PropTypes.string.isRequired
    }).isRequired,
    LocationAddress: PropTypes.shape({
      LocationStreet: PropTypes.shape({
        StreetNumberText: PropTypes.string.isRequired,
        StreetName: PropTypes.string.isRequired,
        StreetCategoryText: PropTypes.string.isRequired
      }).isRequired,
      LocationCityName: PropTypes.string.isRequired,
      LocationState: PropTypes.shape({
        LocationStateName: PropTypes.arrayOf(
          PropTypes.shape({
            eng: PropTypes.string,
            fra: PropTypes.string
          }).isRequired
        )
      }).isRequired,
      LocationCountry: PropTypes.shape({
        LocationCountryName: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default Address;
