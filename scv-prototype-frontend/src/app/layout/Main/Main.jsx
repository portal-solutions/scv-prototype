import React from 'react';

import { usePageMetadataContext } from '../../utils/page-metadata';
import Header from './Header';
import PageDetails from './PageDetails';
import Footer from './Footer';

import './Main.scss';

/**
 * Standard WETv4 page template.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Main = ({ children }) => {
  const { pageMetadata } = usePageMetadataContext();

  return (
    <>
      <Header />
      <main property="mainContentOfPage" className="container" typeof="WebPageElement">
        <h1 property="name" id="wb-cont">
          {pageMetadata.pageTitle}
        </h1>
        <div className="content">{children}</div>
        <PageDetails />
      </main>
      <Footer />
    </>
  );
};

export default Main;
