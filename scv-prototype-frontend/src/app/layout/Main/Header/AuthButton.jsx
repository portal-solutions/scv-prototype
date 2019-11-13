/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAuth } from '../../../utils/auth';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthButton = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { auth, logout } = useAuth();

  const handleSignOut = async (e) => {
    e.preventDefault();

    await logout();
    history.push('/');
  };

  return auth.authenticated && !auth.tokenExpired ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <Trans i18nKey="authentication.welcome">{auth.username}</Trans>
      </div>
      {auth.agreedTermsAndConditions && (
        <Button size={Button.sizes.sm} onClick={handleSignOut} className="ml-4">
          <i className="fas fa-sign-out-alt" aria-hidden="true" /> <span>{t('action.sign-out')}</span>
        </Button>
      )}
    </div>
  ) : null;
};

export default AuthButton;
