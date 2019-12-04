import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Location = ({ location, oneline }) => {
  const { i18n } = useTranslation();

  const parts = [];

  const { id, line1, line2, city, provinceName, postalCode, countryName } = location;

  if (line1) parts.push(line1);
  if (line2) parts.push(line2);

  if (city || provinceName) {
    const cpParts = [];

    if (city) cpParts.push(city);
    if (provinceName) cpParts.push(provinceName[i18n.language === 'fr' ? 'fra' : 'eng']);

    /**
     * join with &nbsp;&nbsp;
     */
    parts.push(cpParts.join('\u00a0\u00a0'));
  }

  if (postalCode) parts.push(postalCode);
  if (countryName) parts.push(countryName);

  return (
    <span id={`location_${id}`}>
      {parts.length > 0
        ? parts.map((part, idx) => {
            let delimiter = '';

            if (idx < parts.length - 1) {
              delimiter = oneline ? ', ' : <br />;
            }

            return (
              <React.Fragment key={idx}>
                <span>{part}</span>
                {delimiter}
              </React.Fragment>
            );
          })
        : null}
    </span>
  );
};

Location.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    provinceName: PropTypes.shape({
      eng: PropTypes.string,
      fra: PropTypes.string
    }),
    postalCode: PropTypes.string,
    countryName: PropTypes.string
  }).isRequired,
  oneline: PropTypes.bool
};

Location.defaultProps = {
  oneline: false
};

export default Location;
