import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const Notifications = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('notifications.document-title'),
    pageIdentifier: t('notifications.page-identifier'),
    pageTitle: t('notifications.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="notifications.message" />
      </p>
    </MainLayout>
  );
};

export default Notifications;
