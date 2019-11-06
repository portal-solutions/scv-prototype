import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TelephoneNumber = ({ program, mobile, home }) => {
  const { t } = useTranslation();

  return (
    <p>
      <strong>
        {t('private.profile.telephone-numbers.telephone')} - {program}
      </strong>
      {mobile || home ? <br /> : null}
      {mobile && (
        <>
          <span className="text-muted">{t('private.profile.telephone-numbers.telephone.mobile')}</span>&nbsp;{mobile}
          {home && <br />}
        </>
      )}
      {home && (
        <>
          <span className="text-muted">{t('private.profile.telephone-numbers.telephone.home')}</span>&nbsp;{home}
        </>
      )}
    </p>
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
