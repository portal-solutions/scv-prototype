import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ProfileInformation from './ProfileInformation';
import PaymentDetails from './PaymentDetails';

const Profile = (prop) => {
	return (
		<>
			<div className="row">
				<div className="col-xs-12 col-md-4">
					<NavBar />
				</div>
				<div className="col-xs-12 col-md-8">
					<Switch>
						<Route exact path="/profile">
							<Redirect to="/profile/profile-information" />
						</Route>
						<Route exact path="/profile/profile-information" component={ProfileInformation} />
						<Route exact path="/profile/payment-details" component={PaymentDetails} />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default Profile;
