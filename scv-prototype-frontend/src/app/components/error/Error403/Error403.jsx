import React from 'react';
import MainLayout from '../../../layout/Main';
import { usePageMetadata } from '../../../utils/page-metadata';

/**
 * 403 Forbidden component that is very similar to what's used by canada.ca
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Error403 = () => {
  usePageMetadata({
    documentTitle: 'Permission denied \u2016 Single client view',
    pageIdentifier: 'SCV-0403-EN',
    pageTitle: 'Permission denied'
  });

  return (
    <MainLayout>
      <p>You are not allowed to access that resource.</p>;
    </MainLayout>
  );
};

export default Error403;
