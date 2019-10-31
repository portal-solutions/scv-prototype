import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MainLayout from '../../layout/Main';
import { usePageMetadata } from '../../utils/page-metadata';

const JobsSkills = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('jobs-skills.document-title'),
    pageIdentifier: t('jobs-skills.page-identifier'),
    pageTitle: t('jobs-skills.page-title')
  });

  return (
    <MainLayout>
      <p>
        <Trans i18nKey="jobs-skills.message" />
      </p>
    </MainLayout>
  );
};

export default JobsSkills;
