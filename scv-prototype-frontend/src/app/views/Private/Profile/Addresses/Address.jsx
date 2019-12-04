/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Location from '../../../../components/Location';
import { makeString } from '../../../../utils/array-utils';

const Address = ({ personLocation }) => {
  const { t } = useTranslation();
  const { programIds, locationAddressCategoryText, statusText, statusDate, location } = personLocation;

  return (
    <p>
      <strong>
        {t('private.profile.addresses.address')} - {t(`location.category.${locationAddressCategoryText}`)}
      </strong>
      <br />
      <Location location={location} />
      <br />
      {programIds && programIds.length > 0 && (
        <>
          <strong className="text-info">
            {t('private.profile.addresses.share-with')}{' '}
            {makeString(programIds.map((programId) => t(`programs.${programId}`)), { lastSeparator: t('and') })}
          </strong>
          <br />
        </>
      )}
      <em>
        {t('status') + t('colon')}&nbsp;
        {statusText}&nbsp;
        {new Date(statusDate).toLocaleDateString()}
      </em>
    </p>
  );
};

Address.propTypes = {
  personLocation: PropTypes.shape({
    programIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    locationAddressCategoryText: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    statusDate: PropTypes.string.isRequired,
    location: Location.propTypes.location
  }).isRequired
};

export default Address;
