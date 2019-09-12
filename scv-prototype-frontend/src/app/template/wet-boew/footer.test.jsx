import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from './footer';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Footer/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
