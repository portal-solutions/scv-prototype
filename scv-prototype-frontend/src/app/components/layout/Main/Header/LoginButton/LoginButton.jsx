import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { AuthContext } from '../../../../../context/AuthContext';

/**
 * A no-frills login button. Doesn't do much; used mostly for testing.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const LoginButton = (props) => {
	const { authenticated, setAuthenticated, setAuthorities, setAuthToken, setUsername } = useContext(AuthContext);

	const handleLogout = () => {
		setAuthenticated(false);
		setAuthorities([]);
		setAuthToken(undefined);
		setUsername('Anonymous');
	};

	return (
		<>
			{authenticated ?
				(
					<>
						<button className="btn btn-primary btn-sm" onClick={handleLogout}>
							<i className="fas fa-sign-out-alt fa-fw" aria-hidden="true"></i> <span>Sign out</span>
						</button>
					</>
				) : (
					<Link to="/sign-in">
						<button className="btn btn-primary btn-sm">
							<i className="fas fa-sign-in-alt fa-fw" aria-hidden="true"></i> <span>Sign in</span>
						</button>
					</Link>
				)
			}
		</>
	);
};

export default LoginButton;
