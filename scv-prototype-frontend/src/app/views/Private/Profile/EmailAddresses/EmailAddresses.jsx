/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EmailAddress from './EmailAddress';
import Button from '../../../../components/Button';

const EmailAddresses = ({ programs, emailAddresses }) => {
  const { t } = useTranslation();

  return (
    <div className="profile__section">
      <div className="profile__section__icon">
        <i className="fas fa-envelope fa-fw" />
      </div>
      <div className="profile__section__content">
        <div className="profile__section__content__title">
          <span>{t('private.profile.email-addresses.title')}</span>
          <Button size={Button.sizes.default} variant={Button.variants.default}>
            <i className="fas fa-plus" />
            {t('private.profile.email-addresses.add')}
          </Button>
        </div>
        {programs && programs.length && emailAddresses && emailAddresses.length ? (
          programs.map((p, idx) => {
            // get first from fake data
            const ea = emailAddresses[Math.floor(Math.random() * emailAddresses.length)];

            return (
              <React.Fragment key={idx}>
                <EmailAddress
                  program={t(`programs.${p.ActivityIdentification.IdentificationID}`)}
                  emailAddress={ea.emailAddress}
                />
                {idx !== emailAddresses.length - 1 && <hr />}
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

EmailAddresses.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityIdentification: PropTypes.shape({ IdentificationID: PropTypes.string.isRequired })
    })
  ),
  emailAddresses: PropTypes.arrayOf(PropTypes.shape({ emailAddress: PropTypes.string }))
};

EmailAddresses.defaultProps = {
  programs: [],
  emailAddresses: []
};

export default EmailAddresses;
