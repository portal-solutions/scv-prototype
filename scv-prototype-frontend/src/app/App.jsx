import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Error404 from './components/error/Error404';
import ProtectedRoute from './components/PrivateRoute';
import { AuthenticationProvider } from './context/Authentication';
import { PageMetadataProvider } from './context/PageMetadata';
import MainLayout from './layout/Main';
import BenefitsServices from './views/BenefitsServices';
import BookAppointment from './views/BookAppointment';
import Greeting from './views/Greeting';
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
	return (
		<AuthenticationProvider>
			<PageMetadataProvider>
				<Router>
					<MainLayout>
						<Switch>
							<Route path="/" component={Home} exact />
							<Route path="/benefits-services" component={BenefitsServices} exact />
							<Route path="/book-appointment" component={BookAppointment} exact />
							<Route path="/inbox" component={Inbox} exact />
							<Route path="/jobs-skills" component={JobsSkills} exact />
							<Route path="/lets-connect" component={LetsConnect} exact />
							<Route path="/notifications" component={Notifications} exact />
							<Route path="/preferences" component={Preferences} exact />
							<Route path="/profile" component={Profile} />
							<Route path="/sign-in" component={Login} exact />

							{/* XXX :: GjB :: protected route for testing auth .. will remove later */}
							<ProtectedRoute path="/greeting" component={Greeting} authorities={['USER']} />

							{/* catch-all route is the 404 page */}
							<Route component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}

export default App;
