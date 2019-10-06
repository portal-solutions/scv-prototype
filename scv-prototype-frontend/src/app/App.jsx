import { createBrowserHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Error404 from './components/error/Error404';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/Main';
import { AuthProvider } from './utils/auth';
import { PageMetadataProvider } from './utils/page-metadata';
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
const App = props => {
	const history = createBrowserHistory();

	return (
		<AuthProvider>
			<PageMetadataProvider>
				<Router history={history}>
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
							<PrivateRoute path="/profile" component={Profile} authorities={['USER']} />
							<Route path="/sign-in" component={Login} exact />

							{/* XXX :: GjB :: protected route for testing auth .. will remove later */}
							<PrivateRoute exact path="/greeting" component={Greeting} authorities={['USER']} />

							{/* catch-all route is the 404 page */}
							<Route component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthProvider>
	);
};

export default App;
