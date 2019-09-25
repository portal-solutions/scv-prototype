import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../../hooks';

const PaymentDetails = () => {
	const { t } = useTranslation();

	useDocumentTitle(`${t('profile.payment-details.document-title')} - ${t('profile.document-title')}`);
	usePageIdentifier(t('profile.payment-details.page-identifier'));
	usePageTitle(`${t('profile.page-title')} - ${t('profile.payment-details.page-title')}`);

	return (
		<>
			<div>PaymentDetails</div>
		</>
	);
};

export default PaymentDetails;
