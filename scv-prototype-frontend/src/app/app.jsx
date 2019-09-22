import React from 'react';
import { Route } from 'react-router-dom';
import { Welcome } from './components/welcome/welcome';
import { PageMetadataProvider, AuthenticationProvider } from './context';
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
					<Route path="/" component={ Welcome } exact={ true }/>
				</Template>
			</PageMetadataProvider>
		</AuthenticationProvider>
	);
}
