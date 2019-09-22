import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from './template';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('template renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Template/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('page details renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PageDetails/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
