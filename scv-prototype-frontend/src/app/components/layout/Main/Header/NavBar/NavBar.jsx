import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import NavBarItem from './NavBarItem';
import './NavBar.css'

const NavBar = () => {
	const { t } = useTranslation();
	return (
		<nav role="navigation" id="wb-sm" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg main-navigation-menu" typeof="SiteNavigationElement">
			<div class="container nvbar">
				<h2>Topics menu</h2>
				<div class="row">
					<ul class="list-inline menu">
						<NavBarItem text={t('wet-boew.header.navbar.home')} iconClass="fas fa-home" to="/Home" />
						<NavBarItem text={t('wet-boew.header.navbar.profile')} iconClass="fas fa-user" to="/Profile" />
						<NavBarItem text={t('wet-boew.header.navbar.notifications')} iconClass="fas fa-bell" to="/Notifications" />
						<NavBarItem text={t('wet-boew.header.navbar.inbox')} iconClass="fas fa-inbox" to="/Inbox" />
						<NavBarItem text={t('wet-boew.header.navbar.lets-connect')} iconClass="fas fa-comments" to="/LetsConnect" />
						<NavBarItem text={t('wet-boew.header.navbar.book-appointment')} iconClass="fas fa-calendar" to="/BookAppointment" />
						<NavBarItem text={t('wet-boew.header.navbar.benefits-services')} iconClass="fas fa-hand-holding-heart" to="/BenefitsServices" />
						<NavBarItem text={t('wet-boew.header.navbar.jobs-skills')} iconClass="fas fa-briefcase" to="/JobsSkills" />
						<NavBarItem text={t('wet-boew.header.navbar.preferences')} iconClass="fas fa-cog" to="/Preferences" />
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
