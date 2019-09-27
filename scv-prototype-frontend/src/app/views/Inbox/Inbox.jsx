import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../context/PageMetadata';

const Inbox = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('inbox.document-title'),
		pageIdentifier: t('inbox.page-identifier'),
		pageTitle: t('inbox.page-title')
	});

	return (
		<>
			<p><Trans i18nKey="inbox.message" /></p>
		</>
	);
};

export default Inbox;
