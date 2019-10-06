import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../utils/page-metadata';

const Notifications = props => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('notifications.document-title'),
		pageIdentifier: t('notifications.page-identifier'),
		pageTitle: t('notifications.page-title')
	});

	return (
		<>
			<p>
				<Trans i18nKey="notifications.message" />
			</p>
		</>
	);
};

export default Notifications;
