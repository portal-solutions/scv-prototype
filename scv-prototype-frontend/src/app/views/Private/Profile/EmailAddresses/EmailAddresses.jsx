/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EmailAddress from './EmailAddress';
import Button from '../../../../components/Button';

const EmailAddresses = ({ emailAddresses }) => {
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
        {emailAddresses && emailAddresses.length ? (
          emailAddresses.map((ea, i) => <EmailAddress key={i} program={ea.program} emailAddress={ea.emailAddress} />)
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
  emailAddresses: PropTypes.arrayOf(PropTypes.shape(EmailAddress.propTypes))
};

EmailAddresses.defaultProps = {
  emailAddresses: []
};

export default EmailAddresses;
