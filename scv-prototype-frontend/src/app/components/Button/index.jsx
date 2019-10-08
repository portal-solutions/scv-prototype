/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ type, variant, size, disabled, children, className, ...rest }) => {
  return (
    <button
      type={type}
      className={`btn ${variant.variantClass || ''} ${size.sizeClass || ''} ${className || ''}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.types = {
  button: 'button',
  reset: 'reset',
  submit: 'submit'
};

Button.variants = {
  danger: { variantClass: 'btn-danger' },
  default: { variantClass: 'btn-default' },
  info: { variantClass: 'btn-info' },
  link: { variantClass: 'btn-link' },
  primary: { variantClass: 'btn-primary' },
  success: { variantClass: 'btn-success' },
  warning: { variantClass: 'btn-warning' }
};

Button.sizes = {
  default: { sizeClass: '' },
  large: { sizeClass: 'btn-lg' },
  small: { sizeClass: 'btn-sm' },
  xsmall: { sizeClass: 'btn-xs' }
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.shape({ sizeClass: PropTypes.string }),
  type: PropTypes.oneOf(Object.keys(Button.types)),
  variant: PropTypes.shape({ variantClass: PropTypes.string })
};

Button.defaultProps = {
  className: '',
  disabled: false,
  size: Button.sizes.default,
  type: Button.types.button,
  variant: Button.variants.primary
};

export default Button;
