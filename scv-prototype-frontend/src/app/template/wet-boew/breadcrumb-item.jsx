import React from 'react';
import './breadcrumb-item.css';

/**
 * Standard WETv4 breadcrumb item.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const BreadcrumbItem = (props) => {
	return (
		<li>
			{ props.href
				? (<a href={ props.href }>{ props.text }</a>)
				: (<span>{ props.text }</span>)
			}
		</li>
	);
}
