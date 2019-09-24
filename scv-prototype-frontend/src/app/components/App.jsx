import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthenticationProvider, PageMetadataProvider } from '../context';
import MainLayout from './layout/Main';
import Home from './Home';
import Profile from './Profile';
import Notifications from './Notifications';
import Inbox from './Inbox';
import LetsConnect from './LetsConnect';
import BookAppointment from './BookAppointment';
import BenefitsServices from './BenefitsServices';
import JobsSkills from './JobsSkills';
import Preferences from './Preferences';
import Error404 from './error/Error404';

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
							<Route path="/Home" component={Home} exact />
							<Route path="/Profile" component={Profile} exact />
							<Route path="/Notifications" component={Notifications} exact />
							<Route path="/Inbox" component={Inbox} exact />
							<Route path="/LetsConnect" component={LetsConnect} exact />
							<Route path="/BookAppointment" component={BookAppointment} exact />
							<Route path="/BenefitsServices" component={BenefitsServices} exact />
							<Route path="/JobsSkills" component={JobsSkills} exact />
							<Route path="/Preferences" component={Preferences} exact />
							<Route path="/" component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}

export default App;
