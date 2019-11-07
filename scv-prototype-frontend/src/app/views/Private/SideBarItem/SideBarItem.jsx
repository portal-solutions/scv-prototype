import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const SideBarItem = ({ text, to, iconClass }) => {
  return (
    <li>
      <NavLink to={to} className="list-group-item" activeClassName="wb-navcurr" title={text}>
        {iconClass && <i className={iconClass}></i>}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default withRouter(SideBarItem);
