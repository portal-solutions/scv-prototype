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
export const Welcome = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('welcome.document-title'));

	const { setPageIdentifier, setPageTitle } = useContext(PageMetadataContext);
	setPageIdentifier(t('welcome.page-identifier'));
	setPageTitle(t('welcome.page-title'));

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
