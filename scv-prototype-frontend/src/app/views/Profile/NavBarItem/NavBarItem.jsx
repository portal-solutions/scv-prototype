import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavBarItem = (props) => {
	return (
		<li role="presentation" className={props.location.pathname === props.to ? 'active' : ''}>
			<NavLink to={props.to} activeClassName="active" title={props.text}>
				{props.iconClass && <i className={props.iconClass}></i>} <span>{props.text}</span>
			</NavLink>
		</li>
	);
};

export default withRouter(NavBarItem);
