import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../utils/page-metadata';

const LetsConnect = props => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('lets-connect.document-title'),
		pageIdentifier: t('lets-connect.page-identifier'),
		pageTitle: t('lets-connect.page-title')
	});

	return (
		<>
			<p>
				<Trans i18nKey="lets-connect.message" />
			</p>
		</>
	);
};

export default LetsConnect;
