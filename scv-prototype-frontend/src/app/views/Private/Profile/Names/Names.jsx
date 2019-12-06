/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Name from './Name';

const Names = ({ person, programs }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-file-alt fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="profile__section__content__title">
          <span>{t('private.profile.names.title')}</span>
        </div>
        {person && programs && programs.length ? (
          programs.map((p, idx) => {
            return (
              <React.Fragment key={idx}>
                <Name
                  program={t(`programs.${p.ActivityIdentification.IdentificationID}`)}
                  name={person.PersonName.PersonFullName}
                />
                {idx !== programs.length - 1 && <hr />}
              </React.Fragment>
            );
          })
        ) : (
          <p className="text-center">
            <em>{t('no-data-available')}</em>
          </p>
        )}
      </div>
    </div>
  );
};

Names.propTypes = {
  person: PropTypes.shape({
    PersonName: PropTypes.shape({ PersonFullName: PropTypes.string.isRequired })
  }),
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  )
};

Names.defaultProps = {
  person: null,
  programs: []
};

export default Names;
