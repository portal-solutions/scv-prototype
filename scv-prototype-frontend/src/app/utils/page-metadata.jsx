import preval from 'preval.macro';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const applicationDateModified = preval('module.exports = new Date().toISOString().slice(0, 10)');
const applicationVersion = preval('module.exports = require("../../../package.json").version');

/**
 * React context to hold all of the page metadata.
 */
const PageMetadataContext = createContext();

/**
 * A convenience hook to return the page metadata context in a more concise manner.
 */
const usePageMetadataContext = () => {
  return useContext(PageMetadataContext);
};

/**
 * The default state, used when no state has been set.
 */
const initialState = {
  applicationDateModified,
  applicationVersion,
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
 * The context provider.
 */
const PageMetadataProvider = ({ children }) => {
  const [pageMetadata, setPageMetadata] = useReducer(reducer, initialState);

  return (
    <PageMetadataContext.Provider value={{ pageMetadata, setPageMetadata }}>{children}</PageMetadataContext.Provider>
  );
};

/**
 * Hook to update the page metadata. Will redraw when the language changes.
 */
const usePageMetadata = (pageMetadata) => {
  const { setPageMetadata } = useContext(PageMetadataContext);

  useEffect(() => {
    setPageMetadata({ ...pageMetadata });
    document.title = pageMetadata.documentTitle;
    // eslint-disable-next-line
  }, [JSON.stringify(pageMetadata)]);
};

PageMetadataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { PageMetadataContext, PageMetadataProvider, usePageMetadata, usePageMetadataContext };
