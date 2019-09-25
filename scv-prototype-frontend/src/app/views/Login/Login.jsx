import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';
import './Login.css';

/**
 * A very simple login component.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Login = (props) => {
	const { setAuthenticated, setAuthorities, setAuthToken, setUsername } = useContext(AuthContext);

	// XXX :: GjB :: remove values (eventually)!
	const [email, setEmail] = useState('user@example.com');
	const [password, setPassword] = useState('password');

	useDocumentTitle('Login required \u2014 Single client view');
	usePageIdentifier('SCV-9999');
	usePageTitle('Login required');

	const handleSubmit = (event) => {
		event.preventDefault();

		// TODO :: GjB :: perform REST call via service class

		setAuthenticated(true);
		setAuthorities(['USER']);
		setAuthToken('auth-token');
		setUsername(email);
	};

	return (
		<>
			<div className="alert alert-warning">
				<span>The page you are requesting requires that you login.</span>
			</div>

			<form className="well" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email address: (tip: enter 'user@example.com')</label>
					<input id="email" name="email" type="email" className="form-control" value={email} onChange={setEmail} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password: (tip: enter 'password')</label>
					<input id="password" name="password" type="password" className="form-control" value={password} onChange={setPassword} />
				</div>
				<button className="btn btn-primary btn-lg">
					<i className="fas fa-sign-in-alt fa-fw" aria-hidden="true"></i>
					<span>Sign in</span>
				</button>
			</form>
		</>
	);
};

export default Login;
