import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../context/PageMetadata';
import './Home.css';

/**
 * A simple Home page.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Home = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('home.document-title'),
		pageIdentifier: t('home.page-identifier'),
		pageTitle: t('home.page-title')
	});

	return (
		<>
			<p><Trans i18nKey="home.message" /></p>
			<p>
				<Trans i18nKey="home.more-information">
					<a href="https://projects.invisionapp.com/share/CAPAK97BE6D" target="_blank" rel="noopener noreferrer">click here</a>
				</Trans>
			</p>
		</>
	);
};

export default Home;
