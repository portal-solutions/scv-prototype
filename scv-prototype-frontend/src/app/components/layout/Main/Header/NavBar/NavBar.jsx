import React from 'react';
import NavBarItem from './NavBarItem'

const NavBar = () => {
  return (
    <nav role="navigation" id="wb-sm" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg" typeof="SiteNavigationElement">
      <div class="container nvbar">
        <h2>Topics menu</h2>
        <div class="row">
          <ul class="list-inline menu">
            <NavBarItem text="Home" iconClass="fas fa-home" to="/Home" />
            <NavBarItem text="Profile" iconClass="fas fa-user" to="/Profile" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
