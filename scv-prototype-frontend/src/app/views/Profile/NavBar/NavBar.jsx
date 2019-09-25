import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBarItem from './NavBarItem';
import './NavBar.css'

const NavBar = () => {
	const { t } = useTranslation();
	return (
		<nav>
			<ul className="nav nav-pills nav-stacked profile-navigation-bar">
				<NavBarItem text={t('profile.navbar.profile-information')} iconClass="fas fa-user-circle fa-fw" to="/profile/profile-information" />
				<NavBarItem text={t('profile.navbar.payment-details')} iconClass="fas fa-dollar-sign fa-fw" to="/profile/payment-details" />
			</ul>
		</nav>
	);
};

export default NavBar;
