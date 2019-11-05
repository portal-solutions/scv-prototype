import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../utils/page-metadata';

const Consent = () => {
  const { t } = useTranslation();

  usePageMetadata({
    documentTitle: t('private.consent.document-title'),
    pageIdentifier: t('private.consent.page-identifier'),
    pageTitle: t('private.consent.page-title')
  });

  return (
    <div className="panel panel-info">
      <div className="panel-heading">{t('private.consent.description.title')}</div>
      <div className="panel-body">
        <p>{t('private.consent.description.content-top')}</p>
        <ul>
          {t('private.consent.description.context-items', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('private.consent.description.content-bottom')}</p>
      </div>
    </div>
  );
};

export default Consent;
