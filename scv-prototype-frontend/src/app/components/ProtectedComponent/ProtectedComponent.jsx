import React from 'react';
import { usePageIdentifier, usePageTitle, useDocumentTitle } from '../../hooks';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const ProtectedComponent = (props) => {
	useDocumentTitle('Protected content \u2014 Single client view');
	usePageIdentifier('SCV-XXXX');
	usePageTitle('Protected content');

	return (<p>This content is <strong>protected</strong>!</p>);
};

export default ProtectedComponent;
