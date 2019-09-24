import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarItem = (props) => {

  return (
    <li>
      <NavLink to={props.to} activeClassName="active">
        {props.iconClass && <i className={props.iconClass}></i>}
        <span>{props.text}</span>
      </NavLink>
    </li>
  );
};

export default NavBarItem;
