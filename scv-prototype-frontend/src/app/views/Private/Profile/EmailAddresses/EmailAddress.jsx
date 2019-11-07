import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const EmailAddress = ({ program, emailAddress }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.email-addresses.email-address')} - {program}
      </strong>
      <br />
      {emailAddress}
    </p>
  );
};

EmailAddress.propTypes = {
  program: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired
};

export default EmailAddress;
