import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const Preferences = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('preferences.document-title'));
	usePageIdentifier(t('preferences.page-identifier'));
	usePageTitle(t('preferences.page-title'));

	return (
		<>
			<p><Trans i18nKey="preferences.message" /></p>
		</>
	);
};

export default Preferences;
