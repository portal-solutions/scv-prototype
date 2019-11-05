import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../utils/page-metadata';

const ServiceActions = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('private.service-actions.document-title'),
    pageIdentifier: t('private.service-actions.page-identifier'),
    pageTitle: t('private.service-actions.page-title')
  });

  return (
    <div className="panel panel-info">
      <div className="panel-heading">{t('private.service-actions.description.title')}</div>
      <div className="panel-body">
        <p>{t('private.service-actions.description.content')}</p>
      </div>
    </div>
  );
};

export default ServiceActions;
