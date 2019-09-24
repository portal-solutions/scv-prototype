import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../../../context';

const LoginButton = (props) => {
	const { username, setUsername } = useContext(AuthenticationContext);

	return (
		<>
			{username ?
				(
					<>
						<button className="btn btn-primary btn-sm" onClick={() => { setUsername(undefined) }}>
							<i className="fas fa-sign-out-alt fa-fw" aria-hidden="true"></i> <span>Sign out</span>
						</button>
					</>
				) : (
					<>
						<button className="btn btn-primary btn-sm" onClick={() => { setUsername('foo') }}>
							<i className="fas fa-sign-in-alt fa-fw" aria-hidden="true"></i> <span>Sign in</span>
						</button>
					</>
				)
			}
		</>
	);
};

export default LoginButton;
