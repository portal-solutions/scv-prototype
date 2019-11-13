/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import MainLayout from '../../layout/Main';
import { useAuth } from '../../utils/auth';
import { usePageMetadata } from '../../utils/page-metadata';

/**
 * A very simple login component.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Login = ({ location, history }) => {
  const { t } = useTranslation();
  const { auth, login } = useAuth();

  const [badCredentialsError, setBadCredentialsError] = useState();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [rememberMe, setRememberMe] = useState(false);

  usePageMetadata({
    documentTitle: t('login.document-title'),
    pageIdentifier: t('login.page-identifier'),
    pageTitle: t('login.page-title')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // call login
    (async () => {
      try {
        await login(username, password);
      } catch (err) {
        if (err.name === 'BadCredentialsError') {
          setBadCredentialsError(err);
          setLoading(false);
        } else {
          throw err;
        }
      }
    })();
  };

  // check if user logged in
  const { from } = location.state || { from: { pathname: '/' } };

  if (auth.authenticated && !auth.tokenExpired) {
    return <Redirect to={from} />;
  }

  return (
    <MainLayout>
      <div id='login-page'>
        <form className='well col-md-8 z-depth-1 mrgn-tp-lg' onSubmit={handleSubmit}>
          <h2 className='h3 mrgn-tp-0 mrgn-bttm-lg'>{t('login.greeting')}</h2>

          <FormGroup
            label={t('login.input.username')}
            labelFor='email'
            className={badCredentialsError && 'input-error'}
            required>
            <input
              id='email'
              name='email'
              type='email'
              className='form-control'
              placeholder={t('login.input.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size='50'
            />
          </FormGroup>

          <FormGroup
            label={t('login.input.password')}
            labelFor='password'
            className={badCredentialsError && 'input-error'}
            required>
            <input
              id='password'
              name='password'
              type='password'
              className='form-control'
              placeholder={t('login.input.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size='50'
            />
          </FormGroup>

          <div className='form-group'>
            <label htmlFor='remember-me' className='checkbox-inline'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                defaultChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>{t('login.input.remember-me')}</span>
            </label>
          </div>

          {badCredentialsError && (
            <div className='alert alert-danger'>
              <span>{t('login.bad-credentials')}</span>
            </div>
          )}

          {auth.tokenExpired && (
            <div className='alert alert-danger'>
              <span>Your session has expired; please sign in again.</span>
            </div>
          )}

          <Button type={Button.types.submit} size={Button.sizes.lg} disabled={loading}>
            <i className={`fas fa-sign-in-alt fa-fw ${loading && 'fa-spinner fa-spin'}`} aria-hidden='true' />
            <span className='mrgn-lft-sm'>{t('login.input.login')}</span>
          </Button>

          <Button variant={Button.variants.link}>{t('login.input.forgot-password')}</Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default withRouter(Login);
