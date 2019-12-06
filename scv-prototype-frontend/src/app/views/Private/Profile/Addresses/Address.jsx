/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Location from '../../../../components/Location';
import { makeString } from '../../../../utils/array-utils';

const Address = ({ personLocation }) => {
  const { t } = useTranslation();
  const { programIds, locationAddressCategoryText, statusText, statusDate, location } = personLocation;

  const statusIcons = {
    accepted: 'fas fa-check-circle text-success',
    pending: 'fas exclamation-triangle text-warning'
  };

  return (
    <>
      <h4>
        {t('private.profile.addresses.address')} - {t(`location.category.${locationAddressCategoryText}`)}
      </h4>
      <p>
        <Location location={location} />
      </p>
      {programIds && programIds.length > 0 && (
        <p>
          <i className="fas fa-share-alt mr-3" />
          <strong className="text-info">
            {t('private.profile.addresses.share-with')}{' '}
            {makeString(programIds.sort().map((programId) => t(`programs.${programId}`)), {
              lastSeparator: t('and')
            })}
          </strong>
        </p>
      )}
      <p>
        <em>
          <strong>{t('status') + t('colon')}</strong>
          &nbsp;{t(`private.profile.addresses.status.${statusText.toLowerCase()}`)}&nbsp;-&nbsp;{statusDate}
          <i className={`${statusIcons[statusText.toLowerCase()]} ml-3`} />
        </em>
      </p>
    </>
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
