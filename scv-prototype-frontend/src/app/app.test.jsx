import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app';
import './i18n';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><App/></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});
