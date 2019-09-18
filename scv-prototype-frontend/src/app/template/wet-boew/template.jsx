import preval from 'preval.macro';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbProvider, PageMetadataProvider } from '../../context';
import pkg from '../../../../package.json';
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
	const { t } = useTranslation();

	const [ applicationDateModified, setApplicationDateModified ] = useState(preval`module.exports = new Date().toISOString().slice(0, 10)`);
	const [ applicationVersion, setApplicationVersion ] = useState(pkg.version);
	const [ breadcrumbs, setBreadcrumbs ] = useState([]);
	const [ pageIdentifier, setPageIdentifier] = useState(t('wet-boew.header.default-page-identifier'));
	const [ pageTitle, setPageTitle ] = useState(t('wet-boew.header.default-page-title'));

	const breadcrumbContext = {
		breadcrumbs, setBreadcrumbs
	};

	const pageMetadataContext = {
		applicationDateModified, setApplicationDateModified,
		applicationVersion, setApplicationVersion,
		pageIdentifier, setPageIdentifier,
		pageTitle, setPageTitle
	};

	return (
		<PageMetadataProvider value={ pageMetadataContext }>
			<BreadcrumbProvider value={ breadcrumbContext }>
				<Header></Header>
				<main property="mainContentOfPage" className="container" typeof="WebPageElement">
					<h1 property="name" id="wb-cont">{ pageTitle }</h1>
					<div className="content">{ props.children }</div>
					<PageDetails></PageDetails>
				</main>
				<Footer></Footer>
			</BreadcrumbProvider>
		</PageMetadataProvider>
	);
}
