import React from 'react';
import { usePageMetadata } from '../../../utils/page-metadata';

/**
 * 403 Forbidden component that is very similar to what's used by canada.ca
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Error403 = props => {
	usePageMetadata({
		documentTitle: 'Permission denied \u2016 Single client view',
		pageIdentifier: 'SCV-0403-EN',
		pageTitle: 'Permission denied'
	});

	return <p>You are not allowed to access that resource.</p>;
};

export default Error403;
