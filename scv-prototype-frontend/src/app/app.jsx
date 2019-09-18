import React from 'react';
import { Route } from 'react-router-dom';
import { Welcome } from './components/welcome/welcome';
import { ApplicationContextProvider } from './context/index.jsx';
import { WETv4 } from './template/wet-boew';

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const App = (props) => {
	return (
		<ApplicationContextProvider>
			<WETv4>
				<Route path="/" component={ Welcome } exact={ true }/>
			</WETv4>
		</ApplicationContextProvider>
	);
}
