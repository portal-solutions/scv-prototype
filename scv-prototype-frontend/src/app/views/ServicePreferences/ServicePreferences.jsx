import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const ServicePreferences = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('service-preferences.document-title'),
    pageIdentifier: t('service-preferences.page-identifier'),
    pageTitle: t('service-preferences.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="service-preferences.message" />
      </p>
    </MainLayout>
  );
};

export default ServicePreferences;
