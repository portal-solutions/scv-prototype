/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TelephoneNumber from './TelephoneNumber';
import Button from '../../../../components/Button';

const TelephoneNumbers = ({ programs, telephoneNumbers }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-phone fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="profile__section__content__title">
          <span>{t('private.profile.telephone-numbers.title')}</span>
          <Button size={Button.sizes.default} variant={Button.variants.default}>
            <i className="fas fa-plus" />
            {t('private.profile.telephone-numbers.add')}
          </Button>
        </div>
        {programs && programs.length && telephoneNumbers && telephoneNumbers.length ? (
          programs.map((p, i) => {
            // get first from fake data
            const tn = telephoneNumbers[Math.floor(Math.random() * telephoneNumbers.length)];

            return (
              <TelephoneNumber
                key={i}
                program={t(`programs.${p.ActivityIdentification.IdentificationID}`)}
                mobile={tn.mobile}
                home={tn.home}
              />
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

TelephoneNumbers.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  ),
  telephoneNumbers: PropTypes.arrayOf(PropTypes.shape({ mobile: PropTypes.string, home: PropTypes.string }))
};

TelephoneNumbers.defaultProps = {
  programs: [],
  telephoneNumbers: []
};

export default TelephoneNumbers;
