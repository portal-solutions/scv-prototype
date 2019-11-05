/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAuth } from '../../../utils/auth';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthButton = ({ history }) => {
  const { t } = useTranslation();
  const { auth, logout } = useAuth();

  const handleSignOut = async (e) => {
    e.preventDefault();

    await logout();
    history.push('/');
  };

  return auth.authenticated && !auth.tokenExpired ? (
    <>
      <span className="btn">
        <Trans i18nKey="authentication.welcome">{auth.username}</Trans>
      </span>
      <Button size={Button.sizes.sm} onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt" aria-hidden="true" /> <span>{t('action.sign-out')}</span>
      </Button>
    </>
  ) : null;
};

export default withRouter(AuthButton);
