import preval from 'preval.macro';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { version as applicationVersion } from '../../../../package.json';
import { PageMetadataContext } from '../../context';
import { useApplicationDateModified, useApplicationVersion } from '../../hooks';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import './index.css';

// the following will pre-evaluate some nodejs code to acquire the build date
const applicationDateModified = preval('module.exports = new Date().toISOString().slice(0, 10)');

/**
 * Standard WETv4 page template.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const Template = (props) => {
	const { pageTitle } = useContext(PageMetadataContext);

	useApplicationVersion(applicationVersion);
	useApplicationDateModified(applicationDateModified);

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

/**
 * Standard WETv4 page details component.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PageDetails = (props) => {
	const { t } = useTranslation();
	const { applicationDateModified, applicationVersion, pageIdentifier } = useContext(PageMetadataContext);

	return (
		<div className="pagedetails clearfix">
			{ (applicationDateModified || applicationVersion || pageIdentifier) &&
				<dl id="wb-dtmd">
					{ pageIdentifier &&
						<>
							<dt>{ t('wet-boew.page-details.screen-identifier') }</dt>
							<dd property="identifier">{ pageIdentifier }</dd>
						</>
					}
					{ applicationDateModified &&
						<>
							<dt>{ t('wet-boew.page-details.date-modified') }</dt>
							<dd><time property="dateModified">{ applicationDateModified }</time></dd>
						</>
					}
					{ applicationVersion &&
						<>
							<dt>{ t('wet-boew.page-details.version') }</dt>
							<dd property="version">{ applicationVersion }</dd>
						</>
					}
				</dl>
			}
		</div>
	);
}
