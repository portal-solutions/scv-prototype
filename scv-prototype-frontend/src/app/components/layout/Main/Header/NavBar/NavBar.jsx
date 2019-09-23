import React from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav role="navigation" id="wb-sm" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg main-navigation-menu" typeof="SiteNavigationElement">
      <div class="container nvbar">
        <h2>Topics menu</h2>
        <div class="row">
          <ul class="list-inline menu">
            <NavBarItem text="Home" iconClass="fas fa-home" to="/Home" />
            <NavBarItem text="Profile" iconClass="fas fa-user" to="/Profile" />
            <NavBarItem text="Notifications" iconClass="fas fa-bell" to="/Notifications" />
            <NavBarItem text="Inbox" iconClass="fas fa-inbox" to="/Inbox" />
            <NavBarItem text="Let's connect" iconClass="fas fa-comments" to="/LetsConnect" />
            <NavBarItem text="Book an appointment" iconClass="fas fa-calendar" to="/BookAppointment" />
            <NavBarItem text="Benefits and services" iconClass="fas fa-hand-holding-heart" to="/BenefitsServices" />
            <NavBarItem text="Jobs and skills" iconClass="fas fa-briefcase" to="/JobsSkills" />
            <NavBarItem text="Preferences" iconClass="fas fa-cog" to="/Preferences" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
