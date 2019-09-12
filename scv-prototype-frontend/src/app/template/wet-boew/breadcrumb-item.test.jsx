import React from 'react';
import ReactDOM from 'react-dom';
import { BreadcrumbItem } from './breadcrumb-item';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<BreadcrumbItem href="http://www.canada.ca/" text="Home"/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
