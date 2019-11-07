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
    <div className="panel panel-default">
      <div className="panel-heading">{t('private.service-preferences.panel.title')}</div>
      <div className="panel-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra laoreet maximus. Aenean finibus aliquet
          justo non cursus. In condimentum tincidunt lectus et molestie. Quisque consectetur tincidunt suscipit.
          Phasellus ut arcu at enim dignissim dictum non nec magna. Phasellus aliquet quam sit amet velit convallis
          maximus. Donec eget nulla tincidunt lectus laoreet imperdiet. Maecenas blandit enim sed dolor eleifend
          condimentum.
        </p>
        <p>
          Donec pulvinar euismod sapien, eu ornare ipsum vestibulum ac. Phasellus at velit sit amet nisl dictum luctus.
          Nam efficitur tellus nec sem condimentum interdum sit amet vitae arcu. Vestibulum aliquet risus a nulla
          consectetur, quis rhoncus sem malesuada. Nullam dictum justo vitae nulla semper mollis. Mauris varius vitae
          dolor ut imperdiet. Integer felis erat, laoreet et fringilla id, iaculis ut ex. Praesent ut viverra turpis.
          Suspendisse vestibulum tellus id est pulvinar, eu accumsan libero consequat. Nam auctor ex id est ornare
          bibendum. Maecenas viverra vitae ante et ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer dictum hendrerit nibh, vitae ullamcorper felis facilisis ac. Maecenas aliquam nisi in erat semper
          congue. Etiam vitae tempor ipsum.
        </p>
      </div>
    </div>
  );
};

export default ServicePreferences;
