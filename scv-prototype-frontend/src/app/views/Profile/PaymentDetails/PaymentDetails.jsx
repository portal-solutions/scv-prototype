import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../context/PageMetadata';

const PaymentDetails = () => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: `${t('profile.payment-details.document-title')} - ${t('profile.document-title')}`,
		pageIdentifier: t('profile.payment-details.page-identifier'),
		pageTitle: `${t('profile.page-title')} - ${t('profile.payment-details.page-title')}`
	});

	return (
		<>
			<div>PaymentDetails</div>
		</>
	);
};

export default PaymentDetails;
