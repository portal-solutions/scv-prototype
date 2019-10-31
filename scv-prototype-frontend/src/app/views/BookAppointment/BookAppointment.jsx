import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const BookAppointment = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('book-appointment.document-title'),
    pageIdentifier: t('book-appointment.page-identifier'),
    pageTitle: t('book-appointment.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="book-appointment.message" />
      </p>
    </MainLayout>
  );
};

export default BookAppointment;
