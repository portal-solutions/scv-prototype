import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const Notifications = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('notifications.document-title'));
	usePageIdentifier(t('notifications.page-identifier'));
	usePageTitle(t('notifications.page-title'));

	return (
		<>
			<p><Trans i18nKey="notifications.message" /></p>
		</>
	);
};

export default Notifications;
