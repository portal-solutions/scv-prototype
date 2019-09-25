import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBarItem from './NavBarItem';
import './NavBar.css'

const NavBar = () => {
	const { t } = useTranslation();
	return (
		<nav role="navigation" id="wb-sm" data-trgt="mb-pnl" className="wb-menu visible-md visible-lg profile-navigation-menu" typeof="SiteNavigationElement">
			<div className="container nvbar">
				<h2>Profile menu</h2>
				<div className="row">
					<ul className="list-inline menu">
						<NavBarItem text={t('profile.navbar.profile-information')} iconClass="fas fa-user-circle fa-fw" to="/profile/profile-information" />
						<NavBarItem text={t('profile.navbar.payment-details')} iconClass="fas fa-dollar-sign fa-fw" to="/profile/payment-details" />
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
