import preval from 'preval.macro';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const applicationDateModified = preval('module.exports = new Date().toISOString().slice(0, 10)');
const applicationVersion = preval('module.exports = require("../../../package.json").version');

/**
 * The default state, used when no state has been set.
 */
const initialState = {
	applicationDateModified: applicationDateModified,
	applicationVersion: applicationVersion,
	pageIdentifier: null,
	pageTitle: null
};

/**
 * A reducer function that is used to merge
 * new state data with the existing state.
 */
const reducer = (state, newState) => {
	return { ...state, ...newState };
};

/**
 * Create the context.
 */
const PageMetadataContext = createContext();

/**
 * The context provider.
 */
const PageMetadataProvider = (props) => {
	const [ pageMetadata, setPageMetadata] = useReducer(reducer, initialState);
	return (<PageMetadataContext.Provider value={{ pageMetadata, setPageMetadata }}>{ props.children }</PageMetadataContext.Provider>);
}

/**
 * Hook to update the page metadata.
 * Will redraw when the language changes.
 */
const usePageMetadata = (pageMetadata) => {
	const { setPageMetadata } = useContext(PageMetadataContext);

	useEffect(() => {
		setPageMetadata(pageMetadata);
		document.title = pageMetadata.documentTitle;
	// eslint-disable-next-line
	}, [JSON.stringify(pageMetadata)]);
};

export { PageMetadataContext, PageMetadataProvider, usePageMetadata };
