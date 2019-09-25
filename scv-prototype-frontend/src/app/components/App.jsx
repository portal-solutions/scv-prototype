import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageMetadataProvider } from '../context';
import { AuthProvider } from '../context/AuthContext';
import BenefitsServices from './BenefitsServices';
import BookAppointment from './BookAppointment';
import Error404 from './error/Error404';
import Home from './Home';
import Inbox from './Inbox';
import JobsSkills from './JobsSkills';
import MainLayout from './layout/Main';
import LetsConnect from './LetsConnect';
import Login from './Login/Login';
import Notifications from './Notifications';
import Preferences from './Preferences';
import ProtectedRoute from './PrivateRoute';
import Profile from './Profile';
import ProtectedComponent from './ProtectedComponent';

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const App = (props) => {
	// TODO :: GjB :: load authContext from localstorage, allowing the user to stay
	//                logged in for a period of time (ie: until the auth token expires)
	const defaultAuthContext = useContext(AuthProvider);

	return (
		<AuthProvider value={defaultAuthContext}>
			<PageMetadataProvider>
				<Router>
					<MainLayout>
						<Switch>
							<Route path="/" component={Home} exact />
							<Route path="/Home" component={Home} exact />
							<Route from="/Profile" component={Profile} />
							<Route path="/Notifications" component={Notifications} exact />
							<Route path="/Inbox" component={Inbox} exact />
							<Route path="/LetsConnect" component={LetsConnect} exact />
							<Route path="/BookAppointment" component={BookAppointment} exact />
							<Route path="/BenefitsServices" component={BenefitsServices} exact />
							<Route path="/JobsSkills" component={JobsSkills} exact />
							<Route path="/Preferences" component={Preferences} exact />

							{/* XXX :: GjB :: protected route for testing auth .. will remove later */}
							<ProtectedRoute path="/protected" component={ProtectedComponent} authorities={['USER']} />
							<Route path="/sign-in" component={Login} exact />

							{/* catch-all route is the 404 page */}
							<Route path="/" component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthProvider>
	);
}

export default App;
