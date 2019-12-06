import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TelephoneNumber = ({ program, mobile, home }) => {
  const { t } = useTranslation();

  return (
    <>
      <h4>
        {t('private.profile.telephone-numbers.telephone')} - {program}
      </h4>
      {mobile && (
        <p>
          <span className="text-muted">{t('private.profile.telephone-numbers.mobile')}</span>&nbsp;{mobile}
        </p>
      )}
      {home && (
        <p>
          <span className="text-muted">{t('private.profile.telephone-numbers.home')}</span>&nbsp;{home}
        </p>
      )}
    </>
  );
};

TelephoneNumber.propTypes = {
  program: PropTypes.string.isRequired,
  mobile: PropTypes.string,
  home: PropTypes.string
};

TelephoneNumber.defaultProps = {
  mobile: null,
  home: null
};

export default TelephoneNumber;
