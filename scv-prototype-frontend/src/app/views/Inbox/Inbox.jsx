import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const Inbox = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('inbox.document-title'),
    pageIdentifier: t('inbox.page-identifier'),
    pageTitle: t('inbox.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="inbox.message" />
      </p>
    </MainLayout>
  );
};

export default Inbox;
