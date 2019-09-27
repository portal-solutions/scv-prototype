import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';
import apiService from "../../services/ApiService";
import './Login.css';

/**
 * A very simple login component.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Login = (props) => {
	const { setAuthContext } = useContext(AuthContext);

	// XXX :: GjB :: remove values (eventually)!
	const [username, setUsername] = useState('user@example.com');
	const [password, setPassword] = useState('password');
	const [authError, setAuthError] = useState(false);

	useDocumentTitle('Login required \u2014 Single client view');
	usePageIdentifier('SCV-9999');
	usePageTitle('Login required');

	const handleSubmit = (event) => {
		event.preventDefault();

		apiService.login(username, password)
			.then((authentication) => {
				setAuthContext({
					authenticated: true,
					username: username,
					authorities: ['USER'],
					authToken: authentication.accessToken
				});
			})
			.catch(() => setAuthError(true));
	};

	return (
		<>
			<div className="alert alert-warning">
				<span>The page you are requesting requires that you login.</span>
			</div>

			<form className="well" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email address: (tip: enter 'user@example.com')</label>
					<input id="email" name="email" type="email" className="form-control" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password: (tip: enter 'password')</label>
					<input id="password" name="password" type="password" className="form-control" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				{authError && (<div className="alert alert-danger"><span>Incorrect username or password.</span></div>)}
				<button className="btn btn-primary btn-lg">
					<i className="fas fa-sign-in-alt fa-fw" aria-hidden="true"></i>
					<span>Sign in</span>
				</button>
			</form>
		</>
	);
};

export default Login;
