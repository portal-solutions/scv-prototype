import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const LetsConnect = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('lets-connect.document-title'),
    pageIdentifier: t('lets-connect.page-identifier'),
    pageTitle: t('lets-connect.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="lets-connect.message" />
      </p>
    </MainLayout>
  );
};

export default LetsConnect;
