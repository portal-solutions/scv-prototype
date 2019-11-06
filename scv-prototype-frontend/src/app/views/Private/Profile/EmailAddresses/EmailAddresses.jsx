/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EmailAddress from './EmailAddress';

const EmailAddresses = ({ emailAddresses }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h3>
          <i className="fas fa-pin fa-fw" />
        </h3>
      </div>
      <div>
        <h3>{t('private.profile.addresses')}</h3>
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
