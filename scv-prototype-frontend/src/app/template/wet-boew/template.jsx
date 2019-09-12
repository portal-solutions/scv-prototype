import React, { useState } from 'react';
import { BreadcrumbProvider, PageMetadataProvider } from '../../context';
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
const Template = ({ children }) => {
	const [ pageIdentifier, setPageIdentifier] = useState();
	const [ pageTitle, setPageTitle ] = useState();

	const pageMetadataContext = {
		pageIdentifier, pageTitle,
		setPageTitle: (pageTitle) => setPageTitle(pageTitle),
		setPageIdentifier: (pageIdentifier) => setPageIdentifier(pageIdentifier)
	};

	return (
		<>
			<BreadcrumbProvider value={ [{ href: '/test', text: 'test' }] }>
				<Header></Header>
				<main property="mainContentOfPage" className="container" typeof="WebPageElement">
					<PageMetadataProvider value={ pageMetadataContext }>
						<h1 property="name" id="wb-cont">{ pageTitle }</h1>
						<div className="content">{ children }</div>
						<PageDetails></PageDetails>
					</PageMetadataProvider>
				</main>
				<Footer></Footer>
			</BreadcrumbProvider>
		</>
	);
}

export { Template };
