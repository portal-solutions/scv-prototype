import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../utils/page-metadata';

const ServicePreferences = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('private.service-preferences.document-title'),
    pageIdentifier: t('private.service-preferences.page-identifier'),
    pageTitle: t('private.service-preferences.page-title')
  });

  return (
    <div className="panel panel-info">
      <div className="panel-heading">{t('private.service-preferences.description.title')}</div>
      <div className="panel-body">
        <p>{t('private.service-preferences.description.content')}</p>
      </div>
    </div>
  );
};

export default ServicePreferences;
