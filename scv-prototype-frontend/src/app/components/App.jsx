import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticationProvider, PageMetadataProvider } from '../context';
import MainLayout from './layout/Main';
import Home from './Home/';
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
				<MainLayout>
					<Switch>
						<Route path="/" component={Home} exact={true} />
						<Route component={Error404} />
					</Switch>
				</MainLayout>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}

export default App;