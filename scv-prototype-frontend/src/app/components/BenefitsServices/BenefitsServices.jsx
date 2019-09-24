import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const BenefitsServices = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('benefits-services.document-title'));
	usePageIdentifier(t('benefits-services.page-identifier'));
	usePageTitle(t('benefits-services.page-title'));

	return (
		<>
			<p><Trans i18nKey="benefits-services.message" /></p>
		</>
	);
};

export default BenefitsServices;
