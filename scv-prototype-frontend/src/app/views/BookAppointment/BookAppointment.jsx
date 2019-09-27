import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../context/PageMetadata';

const BookAppointment = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('book-appointment.document-title'),
		pageIdentifier: t('book-appointment.page-identifier'),
		pageTitle: t('book-appointment.page-title')
	});

	return (
		<>
			<p><Trans i18nKey="book-appointment.message" /></p>
		</>
	);
};

export default BookAppointment;
