import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PageMetadataProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import BenefitsServices from './views/BenefitsServices';
import BookAppointment from './views/BookAppointment';
import Error404 from './components/error/Error404';
import Home from './views/Home';
import Inbox from './views/Inbox';
import JobsSkills from './views/JobsSkills';
import MainLayout from './layout/Main';
import LetsConnect from './views/LetsConnect';
import Login from './views/Login/Login';
import Notifications from './views/Notifications';
import Preferences from './views/Preferences';
import ProtectedRoute from './components/PrivateRoute';
import Profile from './views/Profile';
import ProtectedComponent from './components/ProtectedComponent';

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
							<Route path="/" exact>
								<Redirect to="/home" />
							</Route>
							<Route exact path="/home" component={Home} />
							<Route path="/Profile" component={Profile} />
							<Route exact path="/notifications" component={Notifications} exact />
							<Route exact path="/inbox" component={Inbox} exact />
							<Route exact path="/lets-connect" component={LetsConnect} exact />
							<Route exact path="/book-appointment" component={BookAppointment} exact />
							<Route exact path="/benefits-services" component={BenefitsServices} exact />
							<Route exact path="/jobs-skills" component={JobsSkills} exact />
							<Route exact path="/preferences" component={Preferences} exact />

							{/* XXX :: GjB :: protected route for testing auth .. will remove later */}
							<ProtectedRoute path="/protected" component={ProtectedComponent} authorities={['USER']} />
							<Route exact path="/sign-in" component={Login} />

							{/* catch-all route is the 404 page */}
							<Route component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthProvider>
	);
}

export default App;
