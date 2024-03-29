import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const FormGroup = (props) => {
  const { t } = useTranslation();

  const {
    label,
    labelFor,
    required,
    className,
    informationMessage,
    successMessage,
    warningMessage,
    errorMessage,
    children
  } = props;

  // message state variable
  let messageState = {
    message: null,
    className: null,
    iconClassName: null
  }; // default

  if (errorMessage !== null && errorMessage.length) {
    messageState = {
      message: errorMessage,
      className: 'has-error',
      iconClassName: 'fas fa-times-circle'
    };
  } else if (warningMessage !== null && warningMessage.length) {
    messageState = {
      message: warningMessage,
      className: 'has-warning',
      iconClassName: 'fas fa-exclamation-triangle'
    };
  } else if (successMessage !== null && successMessage.length) {
    messageState = {
      message: successMessage,
      className: 'has-success',
      iconClassName: 'fas fa-check-circle'
    };
  } else if (informationMessage !== null && informationMessage.length) {
    messageState = {
      message: informationMessage,
      className: '',
      iconClassName: 'fas fa-info-circle'
    };
  }

  return (
    <div className={`form-group ${messageState.className || ''} ${className || ''}`}>
      <label htmlFor={labelFor} className={`control-label ${required ? 'required' : ''}`}>
        <span className="field-name">{label}</span>
        {required && <strong className="required ml-2">({t('required')})</strong>}
      </label>
      {messageState.message && (
        <span className="help-block">
          {messageState.iconClassName && <i className={`mr-2 ${messageState.iconClassName}`} />}
          {messageState.message}
        </span>
      )}
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  informationMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

FormGroup.defaultProps = {
  required: false,
  className: null,
  informationMessage: null,
  successMessage: null,
  warningMessage: null,
  errorMessage: null
};

export default FormGroup;
