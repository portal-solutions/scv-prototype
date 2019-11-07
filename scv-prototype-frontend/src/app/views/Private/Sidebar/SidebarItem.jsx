import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ text, to, iconClass }) => {
  return (
    <li>
      <NavLink to={to} className="list-group-item" activeClassName="wb-navcurr" title={text}>
        {iconClass && <i className={iconClass} />}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

SidebarItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  iconClass: PropTypes.string
};

SidebarItem.defaultProps = {
  iconClass: null
};

export default SidebarItem;
