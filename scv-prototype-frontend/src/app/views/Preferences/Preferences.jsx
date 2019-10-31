import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const Preferences = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('preferences.document-title'),
    pageIdentifier: t('preferences.page-identifier'),
    pageTitle: t('preferences.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="preferences.message" />
      </p>
    </MainLayout>
  );
};

export default Preferences;
