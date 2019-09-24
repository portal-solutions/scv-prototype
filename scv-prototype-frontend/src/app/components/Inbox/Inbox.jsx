import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const Inbox = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('inbox.document-title'));
	usePageIdentifier(t('inbox.page-identifier'));
	usePageTitle(t('inbox.page-title'));

	return (
		<>
			<p><Trans i18nKey="inbox.message" /></p>
		</>
	);
};

export default Inbox;
