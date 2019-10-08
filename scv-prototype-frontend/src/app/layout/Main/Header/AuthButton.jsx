import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { useAuthContext } from '../../../utils/auth';
import Button from '../../../components/Button';

/**
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthButton = withRouter(({ history }) => {
  const { authContext, setAuthContext } = useAuthContext();
  const { t } = useTranslation();

  const handleSignOut = (e) => {
    e.preventDefault();
    setAuthContext(null);
    history.push('/');
  };

  return (
    <>
      {authContext.authenticated && (
        <>
          <span className="mr-3">
            <Trans i18nKey="authentication.welcome">{authContext.username}</Trans>
          </span>
          <Button size={Button.sizes.sm} onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt mr-2" aria-hidden="true"></i>
            <span>{t('action.sign-out')}</span>
          </Button>
        </>
      )}
    </>
  );
});

export default AuthButton;
