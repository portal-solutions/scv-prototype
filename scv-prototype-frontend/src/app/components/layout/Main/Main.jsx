import preval from 'preval.macro';
import React, { useContext } from 'react';
import { version as applicationVersion } from '../../../../../package.json';
import { PageMetadataContext } from '../../../context';
import { useApplicationDateModified, useApplicationVersion } from '../../../hooks';

import Header from './Header';
import Footer from './Footer';
import PageDetails from './PageDetails';

import './Main.css';

// the following will pre-evaluate some nodejs code to acquire the build date
const applicationDateModified = preval('module.exports = new Date().toISOString().slice(0, 10)');

/**
 * Standard WETv4 page template.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Main = (props) => {
	const { pageTitle } = useContext(PageMetadataContext);

	useApplicationVersion(applicationVersion);
	useApplicationDateModified(applicationDateModified);

	return (
		<>
			<Header />
			<main property="mainContentOfPage" className="container" typeof="WebPageElement">
				<h1 property="name" id="wb-cont">{pageTitle}</h1>
				<div className="content">{props.children}</div>
				<PageDetails />
			</main>
			<Footer></Footer>
		</>
	);
}

export default Main;