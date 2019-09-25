import React from 'react';
import ReactDOM from 'react-dom';
import '../../i18n';
import Home from './Home';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Home />, div);
	ReactDOM.unmountComponentAtNode(div);
});
