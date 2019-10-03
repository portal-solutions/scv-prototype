import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {

	const { type,
		variant,
		size,
		disabled,
		children,
		className,
		...otherProps } = props;

	const disabledProp = disabled ? { disabled: "disabled" } : undefined;

	return <button type={type}
		className={
			"btn" +
			` btn-${variant}` +
			(size && size !== Button.sizes.default ? ` btn-${size}` : "") +
			(className ? ` ${className}` : "")
		}
		{...disabledProp}
		{...otherProps}>{children}</button>;
};

Button.types = {
	button: 'button',
	submit: 'submit',
	reset: 'reset'
};

Button.variants = {
	default: 'default',
	primary: 'primary',
	success: 'success',
	info: 'info',
	warning: 'warning',
	danger: 'danger',
	link: 'link'
};

Button.sizes = {
	default: 'default',
	xs: 'xs',
	sm: 'sm',
	lg: 'lg'
};

Button.propTypes = {
	type: PropTypes.oneOf(Object.keys(Button.types)),
	variant: PropTypes.oneOf(Object.keys(Button.variants)),
	size: PropTypes.oneOf(Object.keys(Button.sizes)),
	disabled: PropTypes.bool,
	className: PropTypes.string
};

Button.defaultProps = {
	type: Button.types.button,
	variant: Button.variants.primary,
	size: Button.sizes.default,
	disabled: false,
	className: undefined
}

export default Button;
