import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ProfileInformation from './ProfileInformation';
import PaymentDetails from './PaymentDetails';

const Profile = (props) => {
	return (
		<>
			<NavBar />
			<Switch>
				<Redirect from="/Profile" to="/Profile/ProfileInformation" exact />
				<Route path="/Profile/ProfileInformation" component={ProfileInformation} exact />
				<Route path="/Profile/PaymentDetails" component={PaymentDetails} exact />
			</Switch>
		</>
	);
}

export default Profile;
