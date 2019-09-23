import React from 'react';
import { Link } from 'react-router-dom';

const NavBarItem = (props) => {

  return (
    <li>
      <Link to={props.to}>
        {props.iconClass && <i className={props.iconClass}></i>}
        <span>{props.text}</span>
      </Link>
    </li>
  );
};

export default NavBarItem;
