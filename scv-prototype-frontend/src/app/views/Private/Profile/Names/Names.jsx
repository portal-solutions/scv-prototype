/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Name from './Name';

const Names = ({ names }) => {
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
        {names && names.length ? (
          names.map((n, i) => <Name key={i} program={n.program} name={n.name} />)
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
  names: PropTypes.arrayOf(PropTypes.shape(Name.propTypes))
};

Names.defaultProps = {
  names: []
};

export default Names;
