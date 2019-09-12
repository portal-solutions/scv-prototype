import React from 'react';
import './breadcrumb-item.css';

/**
 * Standard WETv4 breadcrumb item.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const BreadcrumbItem = ({ href, text }) => {
	return (
		<li>
			{ href
				? (<a href={ href }>{ text }</a>)
				: (<span>{ text }</span>)
			}
		</li>
	);
}

export { BreadcrumbItem };
