import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const LetsConnect = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('lets-connect.document-title'));
	usePageIdentifier(t('lets-connect.page-identifier'));
	usePageTitle(t('lets-connect.page-title'));

	return (
		<>
			<p><Trans i18nKey="lets-connect.message" /></p>
		</>
	);
};

export default LetsConnect;
