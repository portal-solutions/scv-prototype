/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, withRouter } from 'react-router-dom';
import { useAuth } from '../../../utils/auth';
import { usePageMetadata } from '../../../utils/page-metadata';
import Button from '../../../components/Button';

/**
 * A very simple terms and conditions component.
 *
 * @author Sebastien Comeau <sebastien.comeau@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const TermsAndConditions = ({ location, history }) => {
  const { t } = useTranslation();
  const { auth, setTermsAndConditionsAgreement } = useAuth();

  const [read, setRead] = useState(false);

  usePageMetadata({
    documentTitle: t('private.terms-and-conditions.document-title'),
    pageIdentifier: t('private.terms-and-conditions.page-identifier'),
    pageTitle: t('private.terms-and-conditions.page-title')
  });

  // check if user agreed to terms and conditions
  const { from } = location.state || { from: { pathname: '/' } };

  if (auth.agreedTermsAndConditions) {
    return <Redirect to={from} />;
  }

  const handleConsent = (e) => {
    e.preventDefault();

    // call login
    (async () => {
      await setTermsAndConditionsAgreement();
    })();
  };

  const handleCancel = (e) => {
    e.preventDefault();

    // redirect to MSCA
    history.push('/msca');
  };

  return (
    <div className='row'>
      <div className='col-xs-12'>
        <p>
          Currently, the following list of programs participate in the Single client View integrated service profile:
        </p>
        <ul>
          <li>Canada Student Loans Program via National Student Loans Service Centre</li>
          <li>Job Bank</li>
        </ul>
        <p>
          By clicking below, you are providing your consent for us to search the participating programs and generate the
          general profile information that those programs hold about you for you to see. After that, you can manage how
          your data is updated and shared across programs from the Single Client View!
        </p>
        <p>Further consent provision can also allow you to:</p>
        <ul>
          <li>Use general profile data for pre-filling applications</li>
          <li>Make your preferences viewable by service agents during service phone calls or in-person</li>
          <li>Using your general profile data to filter relevant job searches, or other benefits and services</li>
        </ul>

        <div className='row'>
          <div className='col-xs-12 col-lg-8'>
            <details className='brdr-0' open=''>
              <summary className='btn btn-default'>Privacy notice and terms and conditions</summary>
              <div className='clearfix' />
              <div className='well row'>
                <p>
                  Donec pulvinar euismod sapien, eu ornare ipsum vestibulum ac. Phasellus at velit sit amet nisl dictum
                  luctus. Nam efficitur tellus nec sem condimentum interdum sit amet vitae arcu. Vestibulum aliquet
                  risus a nulla consectetur, quis rhoncus sem malesuada. Nullam dictum justo vitae nulla semper mollis.
                  Mauris varius vitae dolor ut imperdiet. Integer felis erat, laoreet et fringilla id, iaculis ut ex.
                  Praesent ut viverra turpis. Suspendisse vestibulum tellus id est pulvinar, eu accumsan libero
                  consequat. Nam auctor ex id est ornare bibendum. Maecenas viverra vitae ante et ornare. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Integer dictum hendrerit nibh, vitae ullamcorper felis
                  facilisis ac. Maecenas aliquam nisi in erat semper congue. Etiam vitae tempor ipsum.
                </p>
              </div>
            </details>
          </div>
        </div>

        <div className='checkbox mb-5 mt-5'>
          <label htmlFor='chkRead'>
            <input id='chkRead' type='checkbox' checked={read} onChange={(e) => setRead(e.target.checked)} />I have read
            and agree to the privacy and terms and conditions
          </label>
        </div>

        <div className='mb-4'>
          <Button onClick={handleConsent} disabled={!read}>
            I have read and agree to the Privacy
          </Button>
        </div>
        <div>
          <Button onClick={handleCancel} variant={Button.variants.link}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TermsAndConditions);
