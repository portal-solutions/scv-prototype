import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticationContext } from '../../context/Authentication';
import { usePageMetadata } from '../../context/PageMetadata';
import { useApi } from '../../hooks';

/**
 * A very simple login component.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Login = (props) => {
	const [username, setUsername] = useState('user@example.com');
	const [password, setPassword] = useState('password');
	const [rememberMe, setRememberMe] = useState();

	const {t} = useTranslation();
	const {error, loading, login} = useApi();
	const {authenticationContext} = {...useContext(AuthenticationContext)};

	usePageMetadata({
		documentTitle: t('login.document-title'),
		pageIdentifier: t('login.page-identifier'),
		pageTitle: t('login.page-title'),
		suppressLoginButton: true
	});

	const handleSubmit = (e) => {
		login(username, password);
		e.preventDefault();
	};

	return (
		<div id="login-page">
			<form className="well col-md-8 z-depth-1 mrgn-tp-lg" onSubmit={handleSubmit}>
				<h2 className="h3 mrgn-tp-0 mrgn-bttm-lg">{t('login.greeting')}</h2>
				<div className={`form-group ${error && 'input-error'}`}>
					<label htmlFor="email" className="sr-only">{t('login.input.username')}</label>
					<input
						id="email" name="email" type="email" className="form-control"
						placeholder={t('login.input.username')} defaultValue={username}
						onChange={(e) => setUsername(e.target.value)} size="50"
					/>
				</div>
				<div className={`form-group ${error && 'input-error'}`}>
					<label htmlFor="password" className="sr-only">{t('login.input.password')}</label>
					<input
						id="password" name="password" type="password" className="form-control"
						placeholder={t('login.input.password')}
						onChange={(e) => setPassword(e.target.value)} size="50"
					/>
				</div>
				<div className="form-group">
					<label className="checkbox-inline">
						<input
							id="remember-me" name="remember-me" type="checkbox"
							defaultChecked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
						<span>{t('login.input.remember-me')}</span>
					</label>
				</div>
				{error && (
					<div className="alert alert-danger">
						<span>{t('login.bad-credentials')}</span>
					</div>
				)}
				{authenticationContext.tokenExpired && (
					<div className="alert alert-danger">
						<span>Your session has expired; please sign in again.</span>
					</div>
				)}
				<button className={`btn btn-primary btn-lg ${loading && 'disabled'}`}>
					<i className={`fas fa-sign-in-alt fa-fw ${loading && 'fa-spinner fa-spin'}`} aria-hidden="true"></i>
					<span className="mrgn-lft-sm">{t('login.input.login')}</span>
				</button>
				<button className="btn btn-link">{t('login.input.forgot-password')}</button>
			</form>
		</div>
	);
};

export default Login;
