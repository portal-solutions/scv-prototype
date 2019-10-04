import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBarItem from './NavBarItem';
import ProfileInformation from './ProfileInformation';
import PaymentDetails from './PaymentDetails';
import MyIdentifiers from './MyIdentifiers';
import AuthorizedRepresentatives from './AuthorizedRepresentatives';
import InclusiveAccessibleServiceOptions from './InclusiveAccessibleServiceOptions';
import PrivacySettings from './PrivacySettings';

const Profile = ({ match }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="row profile-container">
				<div className="col-xs-12 col-md-4">
					<nav role="navigation" id="wb-sec" typeof="SiteNavigationElement">
						<ul class="list-group menu list-unstyled">
							<NavBarItem text={t('profile.navbar.profile-information')} iconClass="fas fa-user-circle fa-fw" to={`${match.path}/profile-information`} />
							<NavBarItem text={t('profile.navbar.payment-details')} iconClass="fas fa-dollar-sign fa-fw" to={`${match.path}/payment-details`} />
							<li>
								<ul class="list-group menu list-unstyled">
									<NavBarItem text={t('profile.payment-details.navbar.details')} to={`${match.path}/payment-details/details`} iconClass="fas fa-angle-right fa-fw" />
									<NavBarItem text={t('profile.payment-details.navbar.make-payment')} to={`${match.path}/payment-details/make-payment`} iconClass="fas fa-angle-right fa-fw" />
									<NavBarItem text={t('profile.payment-details.navbar.payment-history')} to={`${match.path}/payment-details/payment-history`} iconClass="fas fa-angle-right fa-fw" />
								</ul>
							</li>
							<NavBarItem text={t('profile.navbar.my-identifiers')} iconClass="fas fa-lock fa-fw" to={`${match.path}/my-identifiers`} />
							<NavBarItem text={t('profile.navbar.authorized-representatives')} iconClass="fas fa-user-friends fa-fw" to={`${match.path}/authorized-representatives`} />
							<NavBarItem text={t('profile.navbar.inclusive-accessible-service-options')} iconClass="fas fa-hands-helping fa-fw" to={`${match.path}/inclusive-accessible-service-options`} />
							<NavBarItem text={t('profile.navbar.privacy-settings')} iconClass="fas fa-info fa-fw" to={`${match.path}/privacy-settings`} />
						</ul>
					</nav>
				</div>
				<div className="col-xs-12 col-md-8">
					<Switch>
						<Route exact path={match.path}>
							<Redirect to={`${match.path}/profile-information`} />
						</Route>
						<Route exact path={`${match.path}/profile-information`} component={ProfileInformation} />
						<Route path={`${match.path}/payment-details`} component={PaymentDetails} />
						<Route exact path={`${match.path}/my-identifiers`} component={MyIdentifiers} />
						<Route exact path={`${match.path}/authorized-representatives`} component={AuthorizedRepresentatives} />
						<Route exact path={`${match.path}/inclusive-accessible-service-options`} component={InclusiveAccessibleServiceOptions} />
						<Route exact path={`${match.path}/privacy-settings`} component={PrivacySettings} />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default Profile;
