import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Error404 from './components/error/Error404';
import ProtectedRoute from './components/PrivateRoute';
import ProtectedComponent from './components/ProtectedComponent';
import { PageMetadataProvider } from './context';
import { AuthContext, AuthProvider } from './context/AuthContext';
import MainLayout from './layout/Main';
import BenefitsServices from './views/BenefitsServices';
import BookAppointment from './views/BookAppointment';
import Home from './views/Home';
import Inbox from './views/Inbox';
import JobsSkills from './views/JobsSkills';
import LetsConnect from './views/LetsConnect';
import Login from './views/Login/Login';
import Notifications from './views/Notifications';
import Preferences from './views/Preferences';
import Profile from './views/Profile';

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const App = (props) => {
	const authContext = useContext(AuthContext);

	return (
		<AuthProvider value={authContext}>
			<PageMetadataProvider>
				<Router>
					<MainLayout>
						<Switch>
							<Route exact path="/" >
								<Redirect to="/home" />
							</Route>
							<Route exact path="/home" component={Home} />
							<Route path="/profile" component={Profile} />
							<Route exact path="/notifications" component={Notifications} exact />
							<Route exact path="/inbox" component={Inbox} exact />
							<Route exact path="/lets-connect" component={LetsConnect} exact />
							<Route exact path="/book-appointment" component={BookAppointment} exact />
							<Route exact path="/benefits-services" component={BenefitsServices} exact />
							<Route exact path="/jobs-skills" component={JobsSkills} exact />
							<Route exact path="/preferences" component={Preferences} exact />

							{/* XXX :: GjB :: protected route for testing auth .. will remove later */}
							<ProtectedRoute path="/protected" component={ProtectedComponent} authorities={['USER']} />

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
