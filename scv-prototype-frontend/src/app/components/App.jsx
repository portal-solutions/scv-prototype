import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthenticationProvider, PageMetadataProvider } from '../context';
import MainLayout from './layout/Main';
import Home from './Home';
import Profile from './Profile';
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
							<Route path="/" component={Error404} />
						</Switch>
					</MainLayout>
				</Router>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}

export default App;