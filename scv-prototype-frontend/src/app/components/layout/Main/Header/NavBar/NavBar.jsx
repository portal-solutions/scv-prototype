import React from 'react';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import NavBarItem from './NavBarItem';

const NavBar = () => {
	const { t } = useTranslation();
	return (
		<nav role="navigation" id="wb-sm" data-trgt="mb-pnl" className="wb-menu visible-md visible-lg main-navigation-menu" typeof="SiteNavigationElement">
			<div className="container nvbar">
				<h2>Topics menu</h2>
				<div className="row">
					<ul className="list-inline menu">
						<NavBarItem text={t('wet-boew.header.navbar.home')} iconClass="fas fa-home" to="/Home" />
						<NavBarItem text={t('wet-boew.header.navbar.profile')} iconClass="fas fa-user" to="/Profile" />
						<NavBarItem text={t('wet-boew.header.navbar.notifications')} iconClass="fas fa-bell" to="/Notifications" />
						<NavBarItem text={t('wet-boew.header.navbar.inbox')} iconClass="fas fa-inbox" to="/Inbox" />
						<NavBarItem text={t('wet-boew.header.navbar.lets-connect')} iconClass="fas fa-comments" to="/LetsConnect" />
						<NavBarItem text={t('wet-boew.header.navbar.book-appointment')} iconClass="fas fa-calendar" to="/BookAppointment" />
						<NavBarItem text={t('wet-boew.header.navbar.benefits-services')} iconClass="fas fa-hand-holding-heart" to="/BenefitsServices" />
						<NavBarItem text={t('wet-boew.header.navbar.jobs-skills')} iconClass="fas fa-briefcase" to="/JobsSkills" />
						<NavBarItem text={t('wet-boew.header.navbar.preferences')} iconClass="fas fa-cog" to="/Preferences" />

						{/* XXX :: GjB :: test code .. remove eventually */}
						<NavBarItem text="Protected" iconClass="fas fa-lock" to="/protected" />
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
