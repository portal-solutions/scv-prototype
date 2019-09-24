import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const BookAppointment = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('book-appointment.document-title'));
	usePageIdentifier(t('book-appointment.page-identifier'));
	usePageTitle(t('book-appointment.page-title'));

	return (
		<>
			<p><Trans i18nKey="book-appointment.message" /></p>
		</>
	);
};

export default BookAppointment;
