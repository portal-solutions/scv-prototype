import React, { createContext, useState } from 'react';

/**
 * Context to hold authentication state.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
	const [ username, setUsername ] = useState(props.username);

	const authenticationContext = {
		username, setUsername
	};

	return (
		<AuthenticationContext.Provider value={ authenticationContext }>{ props.children }</AuthenticationContext.Provider>
	);
}

/**
 * React context that holds various page metadata values
 * such as page title and page identifier.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const PageMetadataContext = createContext();

export const PageMetadataProvider = (props) => {
	const [ applicationDateModified, setApplicationDataModified ] = useState(props.applicationDateModified);
	const [ applicationVersion, setApplicationVersion ] = useState(props.applicationVersion);
	const [ pageIdentifier, setPageIdentifier ] = useState(props.pageIdentifier);
	const [ pageTitle, setPageTitle ] = useState(props.pageTitle);

	const pageMetadataContext = {
		applicationDateModified, setApplicationDataModified,
		applicationVersion, setApplicationVersion,
		pageIdentifier, setPageIdentifier,
		pageTitle, setPageTitle
	};

	return (
		<PageMetadataContext.Provider value={ pageMetadataContext }>{ props.children }</PageMetadataContext.Provider>
	);
}
