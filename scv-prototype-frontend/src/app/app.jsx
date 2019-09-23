import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from './components/not-found/not-found';
import { Welcome } from './components/welcome/welcome';
import { AuthenticationProvider, PageMetadataProvider } from './context';
import { Template } from './template/wet4';

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const App = (props) => {
	return (
		<AuthenticationProvider>
			<PageMetadataProvider>
				<Template>
					<Switch>
						<Route path="/" component={ Welcome } exact={ true }/>
						<Route component={ NotFound }/>
					</Switch>
				</Template>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}
