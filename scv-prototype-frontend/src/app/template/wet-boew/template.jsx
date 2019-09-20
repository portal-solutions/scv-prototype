import preval from 'preval.macro';
import React, { useContext } from 'react';
import pkg from '../../../../package.json';
import { PageMetadataContext } from '../../context';
import { useApplicationDateModified, useApplicationVersion } from '../../hooks';
import { Footer } from './footer';
import { Header } from './header';
import { PageDetails } from './page-details';
import './template.css';

/**
 * Standard WETv4 page template.
 * (stateful)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const Template = (props) => {
	const { pageTitle } = useContext(PageMetadataContext);

	useApplicationVersion(pkg.version);
	useApplicationDateModified(preval`module.exports = new Date().toISOString().slice(0, 10)`);

	return (
		<>
			<Header></Header>
			<main property="mainContentOfPage" className="container" typeof="WebPageElement">
				<h1 property="name" id="wb-cont">{ pageTitle }</h1>
				<div className="content">{ props.children }</div>
				<PageDetails></PageDetails>
			</main>
			<Footer></Footer>
		</>
	);
}
