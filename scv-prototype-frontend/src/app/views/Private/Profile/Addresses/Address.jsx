/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Location from '../../../../components/Location';

const Address = ({ personLocation }) => {
  const { t } = useTranslation();
  const { personLocationAssociation, location, programRequestStatuses } = personLocation;

  const statusIcons = {
    requested: 'fas fa-exclamation-triangle text-warning',
    accepted: 'fas fa-check-circle text-success',
    pending: 'fas fa-exclamation-triangle text-warning'
  };

  return (
    <>
      <h4>
        {t('private.profile.addresses.address')} -{' '}
        {t(`location.category.${personLocationAssociation.Location.LocationAddress.AddressCategoryText}`)}
      </h4>
      <p>
        <Location location={location} />
      </p>
      {programRequestStatuses &&
        programRequestStatuses.filter((prs) => prs.program.ActivityIdentification.IdentificationID !== '1').length >
          0 && (
          <p>
            <h4>
              <i className="fas fa-share-alt mr-3" />
              {t('private.profile.addresses.shared-with')}
            </h4>
            <ul className="list-unstyled">
              {programRequestStatuses
                .filter((prs) => prs.program.ActivityIdentification.IdentificationID !== '1')
                .sort()
                .map((prs) => (
                  <li>
                    <strong className="text-info mr-4">
                      {t(`programs.${prs.program.ActivityIdentification.IdentificationID}`)}
                    </strong>
                    <i className={`${statusIcons[prs.requestStatus.StatusText.toLowerCase()]} mr-2`} />
                    <span>
                      {t(`private.profile.addresses.status.${prs.requestStatus.StatusText.toLowerCase()}`)}
                      &nbsp;-&nbsp;
                      {prs.requestStatus.StatusDate.Date}
                    </span>
                  </li>
                ))}
            </ul>
          </p>
        )}
    </>
  );
};

Address.propTypes = {
  personLocation: PropTypes.shape({
    personLocationAssociation: PropTypes.shape({
      Location: PropTypes.shape({
        LocationAddress: PropTypes.shape({
          AddressCategoryText: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    location: Location.propTypes.location,
    programRequestStatuses: PropTypes.arrayOf(
      PropTypes.shape({
        program: PropTypes.shape({
          ActivityIdentification: PropTypes.shape({
            IdentificationID: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        requestStatus: PropTypes.shape({
          statusText: PropTypes.string.isRequired,
          statusDate: PropTypes.shape({
            Date: PropTypes.string.isRequired
          }).isRequired
        }).isRequired
      })
    )
  }).isRequired
};

export default Address;
