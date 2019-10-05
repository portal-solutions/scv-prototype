import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {

	const { type,
		variant,
		size,
		disabled,
		children,
		className,
		...rest } = props;

	return <button type={type}
		className={`btn ${variant.variantClass || ''} ${size.sizeClass || ''} ${className || ''}`}
		disabled={disabled}
		{...rest}>{children}</button>;
};

Button.types = {
	button: 'button',
	submit: 'submit',
	reset: 'reset'
};

Button.variants = {
	default: { variantClass: 'btn-default' },
	primary: { variantClass: 'btn-primary' },
	success: { variantClass: 'btn-success' },
	info: { variantClass: 'btn-info' },
	warning: { variantClass: 'btn-warning' },
	danger: { variantClass: 'btn-danger' },
	link: { variantClass: 'btn-link' }
};

Button.sizes = {
	default: { sizeClass: '' },
	xsmall: { sizeClass: 'btn-xs' },
	small: { sizeClass: 'btn-sm' },
	large: { sizeClass: 'btn-lg' }
};

Button.propTypes = {
	type: PropTypes.oneOf(Object.keys(Button.types)),
	variant: PropTypes.shape({ variantClass: PropTypes.string }),
	size: PropTypes.shape({ sizeClass: PropTypes.string }),
	disabled: PropTypes.bool,
	className: PropTypes.string
};

Button.defaultProps = {
	type: Button.types.button,
	variant: Button.variants.primary,
	size: Button.sizes.default
}

export default Button;
