import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ProfileInformation from './ProfileInformation';
import PaymentDetails from './PaymentDetails';

const Profile = (prop) => {
	return (
		<>
			<NavBar />
			<Switch>
				<Route exact path="/profile">
					<Redirect to="/profile/profile-information" />
				</Route>
				<Route exact path="/profile/profile-information" component={ProfileInformation} />
				<Route exact path="/profile/payment-details" component={PaymentDetails} />
			</Switch>
		</>
	);
}

export default Profile;
