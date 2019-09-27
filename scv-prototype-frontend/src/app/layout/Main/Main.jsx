import React, { useContext } from 'react';
import { PageMetadataContext } from '../../context/PageMetadata';
import Footer from './Footer';
import Header from './Header';
import './Main.css';
import PageDetails from './PageDetails';

/**
 * Standard WETv4 page template.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Main = (props) => {
	const { pageMetadata } = useContext(PageMetadataContext);

	return (
		<>
			<Header />
			<main property="mainContentOfPage" className="container" typeof="WebPageElement">
				<h1 property="name" id="wb-cont">{pageMetadata.pageTitle}</h1>
				<div className="content">{props.children}</div>
				<PageDetails />
			</main>
			<Footer></Footer>
		</>
	);
}

export default Main;
