import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../utils/page-metadata';

const BenefitsServices = props => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('benefits-services.document-title'),
		pageIdentifier: t('benefits-services.page-identifier'),
		pageTitle: t('benefits-services.page-title')
	});

	return (
		<>
			<p>
				<Trans i18nKey="benefits-services.message" />
			</p>
		</>
	);
};

export default BenefitsServices;
