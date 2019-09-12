import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { PageMetadataContext } from '../../context';
import { useDocumentTitle } from '../../hooks';
import './welcome.css';

/**
 * A simple welcome page.
 * (stateless)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Welcome = () => {
	const { t } = useTranslation();

	useDocumentTitle(t('welcome.document-title'));

	/*
	* FIXME :: GjB :: setBreadcrumbs causes "Maximum update depth exceeded" error
	*/

	// const { setBreadcrumbs } = useContext(BreadcrumbContext);
	// setBreadcrumbs([ { text: 'Foo', href: 'https://www.canada.ca/' } ]);

	/*
	 * FIXME :: GjB :: calling these two functions causes the component to re-render twice (why?)
	 */

	const { setPageIdentifier, setPageTitle } = useContext(PageMetadataContext);
	setPageIdentifier(t('welcome.page-identifier'));
	setPageTitle(t('welcome.page-title', { name: 'Greg' }));

	return (
		<>
			<p><Trans i18nKey="welcome.message"/></p>
			<p>
				<Trans i18nKey="welcome.more-information">
					<a href="https://projects.invisionapp.com/share/CAPAK97BE6D" target="_blank" rel="noopener noreferrer">click here</a>
				</Trans>
			</p>
		</>
	);
}

export { Welcome };
