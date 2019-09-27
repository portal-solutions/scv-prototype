import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../context/PageMetadata';

const Preferences = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('preferences.document-title'),
		pageIdentifier: t('preferences.page-identifier'),
		pageTitle: t('preferences.page-title')
	});

	return (
		<>
			<p><Trans i18nKey="preferences.message" /></p>
		</>
	);
};

export default Preferences;
