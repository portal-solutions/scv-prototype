/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Name from './Name';

const Names = ({ names }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h3>
          <i className="fas fa-file fa-fw" />
        </h3>
      </div>
      <div>
        <h3>{t('private.profile.names')}</h3>
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
