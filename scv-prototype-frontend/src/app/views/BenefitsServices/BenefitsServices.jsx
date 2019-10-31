import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const BenefitsServices = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('benefits-services.document-title'),
    pageIdentifier: t('benefits-services.page-identifier'),
    pageTitle: t('benefits-services.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="benefits-services.message" />
      </p>
    </MainLayout>
  );
};

export default BenefitsServices;
