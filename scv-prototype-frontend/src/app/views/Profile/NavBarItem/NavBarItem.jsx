import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavBarItem = (props) => {
	return (
		<li>
			<NavLink to={props.to} className="list-group-item" activeClassName="wb-navcurr" title={props.text}>
				{props.iconClass && <i className={props.iconClass}></i>}
				<span>{props.text}</span>
			</NavLink>
		</li>
	);
};

export default withRouter(NavBarItem);
