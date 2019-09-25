import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('header renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Header />, div);
	ReactDOM.unmountComponentAtNode(div);
});